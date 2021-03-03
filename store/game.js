import firebase from 'firebase/app'

export const state = () => ({
  data: []
})

export const actions = {
  async fetchDataGame ({ dispatch, commit }, gameName) {
    const uid = firebase.auth().currentUser.uid
    try {
      const statistic = (await firebase.database().ref(`users/${uid}/games_data/${gameName}`).once('value')).val() || {}
      const newData = Object.keys(statistic).map(key => ({ ...statistic[key], id: key }))
      commit('setData', newData)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async createDataGame ({ dispatch, commit }, { name, time, rounds, fail, scores, date, gameDir }) {
    const uid = firebase.auth().currentUser.uid
    try {
      const category = await firebase.database().ref(`users/${uid}/games_data/${gameDir}`).push({ name, time, rounds, fail, scores, date })
      return { name, time, rounds, fail, scores, date, id: category.key }
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }
}

export const mutations = {
  setData (state, data) {
    state.data.push(data)
  },
  clearData (state) {
    state.data = []
  }
}

export const getters = {
  getData: state => state.data
}
