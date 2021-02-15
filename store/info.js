import firebase from 'firebase/app'

export const state = () => ({
  info: {}
})

export const actions = {
  async fetchInfo ({ dispatch, commit }, uid) {
    try {
      const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
      commit('setInfo', info)
    } catch (e) {
      commit('setError')
      throw e
    }
  }
}

export const mutations = {
  setInfo (state, info) {
    state.info = info
  }
}

export const getters = {
  info: s => s.info
}
