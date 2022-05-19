import Vue from 'vue'
import ModalWrapper from '@/components/Modal/ModalWrapper'
import Modal from '@/components/Modal/index'

export default function ({ store }, inject) {
  ;(function (Vue, options) {
    if (Vue.prototype.$modal) {
      return
    }

    const Instance = (Vue, options = {}) => {
      const eventBus = new Vue()

      let isSubscribed = false

      const modalStack = []

      const context = {
        root: null,
        componentName: options.componentName || 'ModalInstance',
      }

      const onSubscribe = () => {
        isSubscribed = true
        // достаем из стека попапы и показываем их
        if (modalStack.length) {
          modalStack.forEach((item) => {
            eventBus.$emit('toggle', item.name, true, item.params, item.resolve)
          })
        }
      }

      const show = (name, params) => {
        if (isSubscribed) {
          return new Promise((resolve) => {
            eventBus.$emit('toggle', name, true, params, resolve)
          })
        } else {
          // засовываем данные попапа в стек
          return new Promise((resolve) => {
            modalStack.push({
              name,
              params,
              resolve,
            })
          })
        }
      }
      const hide = (name, params) => {
        return new Promise((resolve) => {
          eventBus.$emit('toggle', name, false, params, resolve)
        })
      }

      const subscribe = (callback) => {
        eventBus.$on('toggle', callback)
        onSubscribe()
      }

      const unsubscribe = (callback) => {
        eventBus.$off('toggle', callback)
      }

      return {
        context,
        eventBus,
        show,
        hide,
        subscribe,
        unsubscribe,
      }
    }

    const plugin = new Instance(Vue, options)

    Vue.component(plugin.context.componentName, Modal)
    Vue.component('ModalWrapper', ModalWrapper)
    inject('modal', plugin)
  })(Vue)
}
