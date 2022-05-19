<template>
  <ModalWrapper :size="size" :resolve="resolve" v-on="$listeners">
    <template #default="{ close }">
      <div v-if="title" class="modal-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="modal-content" v-html="computedMessage"></div>
      <div class="modal-footer">
        <BButton
          v-if="okButton"
          variant="primary"
          @click="close($event, resolveValue)"
          >{{ okText }}</BButton
        >
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from './ModalWrapper'

export default {
  name: 'ModalError',
  components: { ModalWrapper },
  props: {
    title: {
      type: String,
      default: 'Ошибка',
    },
    message: {
      type: String,
      default: '',
    },
    err: {
      type: Error,
      default: null,
    },
    okText: {
      type: String,
      default: 'Понятно',
    },
    resolve: {
      type: Function,
      default: () => {},
    },
    /**
     * Передаваемый компонент, чтобы выставить у него ошибки
     */
    component: {
      type: [Object],
      default: null,
    },
  },
  data() {
    return {
      resolveValue: true,
      modalWrapperClass: '',
      maxUploadSize: '250Мб',
    }
  },
  asyncComputed: {
    async computedMessage() {
      let message = ''
      if (this.err) {
        const err = this.err
        let responseData = err.response?.data

        if (responseData instanceof Blob) {
          responseData = JSON.parse(await err.response.data.text())
        }

        if (responseData) {
          console.error(err, err.response)

          message = responseData.message
          if (responseData.details) {
            message += ' ' + responseData.details
          }

          if (err.response.status === 413) {
            message = `Нельзя выполнить действие. Общий вес загруженных файлов превышает ${this.maxUploadSize}.`
          }
          if (err.response.status === 422) {
            this.resolveValue = responseData

            if (responseData.data) {
              this.resolveValue = responseData.data
            }

            // переведем все значения в массивы
            for (const k in this.resolveValue) {
              if (!(this.resolveValue[k] instanceof Array)) {
                this.resolveValue[k] = [this.resolveValue[k]]
              }
            }

            // покажем первую ошибку
            if (!message) {
              const keys = Object.keys(this.resolveValue)
              message = responseData[keys[0]]
              if (message instanceof Array) {
                message = message[0]
              }
            }

            // выставим ошибки в компоненте, должен быть подключен миксин
            if (this.component?.setErrorsData) {
              this.component.setErrorsData(this.resolveValue)
            }
          }
        }
      }

      if (this.message) {
        if (message) {
          message += '<br>'
        }
        message += this.message
      }
      if (!message) {
        message = 'Неизвестная ошибка'
        if (this.err) {
          if (!this.err.response) {
            console.error(this.err)
            // выводим как html?
          } else if (
            this.err.response.headers['content-type'].match(/text\/html/)
          ) {
            this.modalWrapperClass = 'wide'
            return this.err.response.data
          }
          message += ': ' + this.err
        }
      }

      return message
    },
  },
}
</script>
