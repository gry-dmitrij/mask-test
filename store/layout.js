import { generateSimpleMutations } from '@/utils/state'

export const state = () => {
  return {
    windowHeight: null,
  }
}

export const getters = {}

export const mutations = {
  ...generateSimpleMutations(Object.keys(state())),
}

export const actions = {
  calculateWindowHeight({ commit, state }) {
    if (!state.windowHeight) {
      if (window) {
        // обновляем css переменную, содержащую высоту экрана
        const onResize = (e) => {
          commit('SET_WINDOW_HEIGHT', window.innerHeight)
          document.documentElement.style.setProperty(
            '--real100Vh',
            state.windowHeight + 'px'
          )
        }
        window.addEventListener('resize', onResize)
        onResize()
      }
    }
    return state.windowHeight
  },
}
