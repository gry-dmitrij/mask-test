import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ws', ['ws']),
  },
  async mounted() {
    await this.$store.dispatch('ws/get')
    this.ws.addEventListener('message', this.onWsMessage)
  },

  beforeDestroy() {
    this.ws.removeEventListener('message', this.onWsMessage)
  },
}
