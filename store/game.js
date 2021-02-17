import firebase from 'firebase/app'

export const state = () => ({
  data: null
})

export const actions = {
  async fetchDataGame ({ dispatch, commit }) {
    const uid = firebase.auth().currentUser.uid
    try {
      const statistic = (await firebase.database().ref(`users/${uid}/game_1`).once('value')).val() || {}
      const newData = Object.keys(statistic).map(key => ({ ...statistic[key], id: key }))
      commit('setData', newData)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async createDataGame ({ dispatch, commit }, { name, time, rounds, fail, date }) {
    const uid = firebase.auth().currentUser.uid
    try {
      const category = await firebase.database().ref(`users/${uid}/game_1`).push({ name, time, rounds, fail, date })
      return { name, time, rounds, fail, date, id: category.key }
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }
}

export const mutations = {
  setData (state, data) {
    state.data = data
  }
}

export const getters = {
  getData: state => state.data
}
