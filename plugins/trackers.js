export default function ({ store }, inject) {
  const trackers = {
    sendEvent(eventName, params = {}) {
      if (!params.user_id) {
        params.user_id = store.state.auth.user.id
      }
      console.log('Send event', eventName, params)
      // eslint-disable-next-line no-undef
      gtag('event', eventName, params)
    },
  }
  // if (window) {
  //   window.addEventListener('beforeunload', (e) => {
  //     trackers.sendEvent('exit')
  //   });
  // }
  inject('trackers', trackers)
}
