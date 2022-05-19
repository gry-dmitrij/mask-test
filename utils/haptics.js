/*
 * Haptics.js - http://hapticsjs.org/
 * Copyright (c) Shantanu Bala 2014 and Marek Lukas 2018
 * Direct questions to shantanu@sbala.org
 * Haptics.js can be freely distributed under the MIT License.
 *
 * https://github.com/Tajnymag/haptics.js/blob/master/haptics.es.js
 */

const Haptics = {}
let currentRecording

// eslint-disable-next-line no-use-before-define
const global = window || global

const navigator = global.navigator

// a console.log wrapper for debugging
const log = function () {
  // store logs to an array for reference
  log.history = log.history || []
  log.history.push(arguments)

  if (global.console) {
    global.console.log(Array.prototype.slice.call(arguments))
  }
}

// used for timeouts that 'accomplish nothing' in a pattern
function emptyFunc() {
  log('Executed emptyFunc, which does nothing.')
}

// check for navigator variables from different vendors
const navigatorVibrate =
  navigator.vibrate ||
  navigator.webkitVibrate ||
  navigator.mozVibrate ||
  navigator.msVibrate

const enabled = !!navigatorVibrate

// calls to navigatorVibrate always bound to global navigator object
function vibrate() {
  if (enabled) {
    // vibrate will not work unless bound to navigator global
    navigatorVibrate.apply(navigator, arguments)
    return true
  }

  // log instead of actually vibrating device if disabled
  log(arguments)
  return false
}

// execute two functions timed using the provided durations
function executeSequence(durations, currentFunc, nextFunc) {
  const d = durations.shift()
  nextFunc = nextFunc || currentFunc

  currentFunc(d)

  if (durations.length === 0) {
    return true // finished executing sequence
  }

  // handle remaining durations
  return global.setTimeout(function () {
    // swap order of next and currentFunc
    return executeSequence(durations, nextFunc, currentFunc)
  }, d)
}

// create a pattern function from a duration sequence
function createSequenceFunc(durations) {
  let sum = 0
  let i = 0
  let len
  for (i = 0, len = durations.length; i < len; i += 1) {
    sum += durations[i]
  }

  return function (duration) {
    const d = duration / sum
    const newVibration = []
    let j
    let len2

    for (j = 0, len2 = durations.length; j < len2; j += 1) {
      newVibration.push(durations[j] * d)
    }

    Haptics.vibrate(newVibration)
  }
}

// create a single pattern function from a sequence of functions
function concatenatePatternFuncs() {
  const funcs = arguments
  const len = arguments.length

  return function (duration) {
    let i = 0
    const d = duration / len

    function executeCurrentFunc() {
      funcs[i](d)
    }

    for (i = 0; i < len; i += 1) {
      global.setTimeout(executeCurrentFunc, d)
    }
  }
}

// a way to quickly create/compose new tactile animations
function patternFactory() {
  const funcs = arguments // each argument is a pattern being combined

  const len = funcs.length

  for (let j = 0; j < len; j += 1) {
    if (typeof funcs[j] !== 'function') {
      funcs[j] = createSequenceFunc(funcs[j])
    }
  }

  const newPattern = concatenatePatternFuncs(funcs)

  return function (args) {
    if (typeof args === 'number') {
      newPattern(args)
    } else {
      executeSequence(args, newPattern, emptyFunc)
    }
  }
}

// create a sequencing pattern function
function createPattern(func) {
  if (arguments.length > 1) {
    func = patternFactory.apply(this, arguments)
  } else if (func && typeof func !== 'function' && func.length) {
    func = createSequenceFunc(func)
  } else if (func && typeof func !== 'function') {
    return null
  }

  function newSequence(args) {
    if (typeof args === 'number' || typeof args === 'undefined') {
      func(args)
    } else {
      executeSequence(args, func, emptyFunc)
    }
  }

  return newSequence
}

function createSimplePattern(pattern) {
  return () => {
    Haptics.vibrate(pattern)
  }
}

// handle click/touch event
function onRecord(e) {
  e.preventDefault()
  currentRecording.push(new Date())
}

// begin recording a sequence of taps/clicks
function record() {
  currentRecording = []
  global.addEventListener('touchstart', onRecord, false)
  global.addEventListener('touchend', onRecord, false)
  global.addEventListener('mousedown', onRecord, false)
  global.addEventListener('mouseup', onRecord, false)
}

// complete a recording of a sequence of taps/clicks
function finish() {
  log(currentRecording)
  global.removeEventListener('touchstart', onRecord)
  global.removeEventListener('touchend', onRecord)
  global.removeEventListener('mousedown', onRecord)
  global.removeEventListener('mouseup', onRecord)

  if (currentRecording.length % 2 !== 0) {
    currentRecording.push(new Date())
  }

  const vibrationPattern = []
  let i
  let j
  let len

  for (i = 0, len = currentRecording.length; i < len; i += 2) {
    j = i + 1

    if (j >= len) {
      break
    }

    vibrationPattern.push(currentRecording[j] - currentRecording[i])
  }

  return vibrationPattern
}

// EFFECTS: Fade In
function vibrateFadeIn(duration = 1000) {
  let pulses = []
  let d
  let i

  if (duration < 100) {
    pulses = duration
  } else {
    d = duration / 100
    for (i = 1; i <= 10; i += 1) {
      pulses.push(i * d)
      if (i < 10) {
        pulses.push((10 - i) * d)
      }
    }
  }
  vibrate(pulses)
}

// EFFECTS: Fade Out
function vibrateFadeOut(duration = 1000) {
  let pulses = []
  let d
  let i

  if (duration < 100) {
    pulses = duration
  } else {
    d = duration / 100
    for (i = 1; i <= 10; i += 1) {
      pulses.push(i * d)
      if (i < 10) {
        pulses.push((10 - i) * d)
      }
    }
    pulses.reverse()
  }
  vibrate(pulses)
}

// EFFECTS: notification
function vibrateNotification(duration = 1500) {
  const pause = duration / 27
  const dot = 2 * pause
  const dash = 3 * pause
  vibrate([
    dot,
    pause,
    dot,
    pause,
    dot,
    pause * 2,
    dash,
    pause,
    dash,
    pause * 2,
    dot,
    pause,
    dot,
    pause,
    dot,
  ])
}

// EFFECTS: heartbeat
function vibrateHeartbeat(duration = 1000) {
  const dot = duration / 60
  const pause = dot * 2
  const dash = dot * 24
  vibrate([dot, pause, dash, pause * 2, dash, pause * 2, dot])
}

// EFFECTS: clunk
function vibrateClunk(duration = 1000) {
  const dot = (duration * 4) / 22
  const pause = dot * 2
  const dash = (dot / 2) * 5
  vibrate([dot, pause, dash])
}

// EFFECTS: PWM
function vibratePWM(duration, on, off) {
  const pattern = [on]
  duration -= on

  while (duration > 0) {
    duration -= off
    duration -= on
    pattern.push(off)
    pattern.push(on)
  }

  vibrate(pattern)
}

function pwm(args, on, off) {
  let newVibratePWM
  if (typeof args === 'number') {
    vibratePWM(args, on, off)
  } else {
    newVibratePWM = function (d) {
      vibratePWM(d, on, off)
    }
    executeSequence(args, newVibratePWM, emptyFunc)
  }
}

// a way to quickly create new PWM intensity functions
function createPatternPWM(on, off) {
  return function (args) {
    pwm(args, on, off)
  }
}

// expose local functions to global API
Haptics.enabled = enabled
Haptics.record = record
Haptics.finish = finish
Haptics.fadeIn = createPattern(vibrateFadeIn)
Haptics.fadeOut = createPattern(vibrateFadeOut)
Haptics.notification = createPattern(vibrateNotification)
Haptics.heartbeat = createPattern(vibrateHeartbeat)
Haptics.clunk = createPattern(vibrateClunk)
Haptics.shortNotification = createSimplePattern([20])
Haptics.success = createSimplePattern([10, 100, 30])
Haptics.failure = createSimplePattern([10, 50, 10, 50, 50, 100, 10])
Haptics.pwm = pwm
Haptics.createPatternPWM = createPatternPWM
Haptics.createPattern = createPattern
Haptics.createSimplePattern = createSimplePattern
Haptics.vibrate = vibrate
Haptics.emptyFunc = emptyFunc

export default Haptics
