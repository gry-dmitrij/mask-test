import { mapState } from 'vuex'
import { snakeCase, toUpper } from 'lodash-es'

export function setterName(key) {
  return toUpper(snakeCase('set ' + key))
}

export function mapStateWithSetters(vuexModule, vars) {
  const getters = mapState(vuexModule, vars)

  for (const k in getters) {
    const setterNameValue = setterName(k)
    getters[k] = {
      get: getters[k],
      set(value) {
        this.$store.commit(`${vuexModule}/${setterNameValue}`, value)
      },
    }
  }

  return getters
}

export function generateSimpleMutations(vars) {
  const result = {}
  for (const i of vars) {
    result[toUpper(snakeCase('set ' + i))] = function (state, payload) {
      state[i] = payload
    }
  }
  return result
}
