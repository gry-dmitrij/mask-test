/**
 * Маска работает в том числи с vuetify элементами
 *
 * Для работы добавить к элементу v-imask со строкой
 * или объектом опций. Опции описаны здесь: https://imask.js.org/guide.html
 *
 * Для корректной работы директивы компонент долден подменять слушателей
 * <input
 *  ...
 *  v-on="inputListeners"
 * />
 *
 * computed: {
 *     inputListeners() {
 *       const vm = this;
 *       return {
 *         ...this.$listeners,
 *         accept(e) {
 *           const maskRef = e.detail;
 *           vm.$emit('input', maskRef.value)
 *         },
 *         input(e) {
 *
 *         }
 *       }
 *     },
 *   },
 *
 */

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
  bind(el, {value: opts}) {
    if (!opts) {
      opts = {
        mask: /^.*$/,
      }
    } else if (typeof opts === 'string') {
      opts = {
        mask: opts,
      }
    }
    const inputEl = getInputElement(el)
    initMask(inputEl, opts)

    if (inputEl !== el) {
      // для работы с vuetify
      fireEvent(inputEl, 'accept', inputEl.maskRef)
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
