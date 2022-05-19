export default ($sendRequest, store) => {
  return {
    connectToWs() {
      return new Promise((resolve, reject) => {
        const $axios = $sendRequest()

        const swoleURL = `${$axios.swoleBaseURLWs}connect`
        const ws = new WebSocket(swoleURL)
        ws.addEventListener('close', function (e) {
          console.log('socket closed', ws, e)
          reject(ws)
        })
        ws.addEventListener('open', function (e) {
          resolve(ws)
        })
      })
    },
  }
}
