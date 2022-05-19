import ws from './modules/ws'

export default ({ $sendRequest, store }, inject) => {
  inject('api', {
    ws: ws($sendRequest, store),
  })
}
