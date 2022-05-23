import IMask from 'imask';

function getInputElement(el) {
  return el instanceof HTMLInputElement ? el : el.querySelector('input') || el
}

function initMask(el, opts) {
  el.maskRef = IMask(el, opts)
    .on('accept', () => fireEvent(el, 'accept', el.maskRef))
}

function fireEvent (el, eventName, data) {
  const e = document.createEvent('CustomEvent');
  e.initCustomEvent(eventName, true, true, data);
  el.dispatchEvent(e);
}

function destroyMask (el) {
  if (el.maskRef) {
    el.maskRef.destroy();
    delete el.maskRef;
  }
}

export default {
  name: 'imask',
  bind(el, {value: opts}, vnode) {
    if (!opts) {
      opts = {
        mask: /^.*$/,
      }
    }
    el = getInputElement(el)
    initMask(el, opts)
    if (el.value !== el.maskRef) {
      fireEvent(el, 'accept', el.maskRef)
    }
  },
  update(el, {value: opts}) {
    el = getInputElement(el);
    if (opts) {
      if (el.maskRef) {
        el.maskRef.updateOptions(opts);
        if (el.value !== el.maskRef.value) el.maskRef._onChange();
      }
      else initMask(el, opts);
    } else {
      destroyMask(el);
    }
  },
  unbind(el) {
    el = getInputElement(el);
    destroyMask(el)
  }
}
