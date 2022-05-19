import { generateSimpleMutations } from '@/utils/state'

export const state = () => {
  return {
    ws: null,
  }
}

export const mutations = {
  ...generateSimpleMutations(Object.keys(state())),
}

export const actions = {
  async get({ commit, state }, force = false) {
    if (state.ws && !force) {
      return state.ws
    }
    const ws = await this.$api.game.connectToWs()
    ws.addEventListener('close', (e) => {
      commit('SET_WS', null)
    })
    ws.addEventListener('message', (e) => {
      try {
        e.dataJson = JSON.parse(e.data)
      } catch (err) {
        // do nothing
      }
      console.log('ws message', e, e.dataJson)
    })
    commit('SET_WS', ws)
    return ws
  },
}
