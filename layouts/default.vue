<template>
  <div>
    <Nuxt />
    <Modal></Modal>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
  // mounted() {
  //   this.$store.dispatch('layout/calculateWindowHeight')
  // },
}
</script>

<style lang="scss" scoped></style>
