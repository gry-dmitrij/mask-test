<template>
  <ModalWrapper :size="size" :resolve="resolve" v-on="$listeners">
    <template #default="{ close }">
      <div v-if="title" class="modal-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="modal-content" v-html="message"></div>
      <div class="modal-footer">
        <BButton
          v-if="cancelButton"
          variant="danger"
          @click="close($event, false)"
          >{{ cancelText }}</BButton
        >
        <BButton
          v-if="okButton"
          variant="primary"
          @click="close($event, true)"
          >{{ okText }}</BButton
        >
      </div>
    </template>
  </ModalWrapper>
</template>

<script>
export default {
  name: 'ModalDefault',
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'small',
    },
    cancelButton: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
      default: 'Отмена',
    },
    okButton: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: 'Ok',
    },
    resolve: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
