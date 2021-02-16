import firebase from 'firebase/app'

export default {
  actions: {
    async fetchDataGame ({ dispatch, commit }) {
      const uid = firebase.auth().currentUser.uid
      try {
        const statistic = (await firebase.database().ref(`users/${uid}/game_1`).once('value')).val() || {}
        return Object.keys(statistic).map(key => ({ ...statistic[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createDataGame ({ dispatch, commit }, { time, rounds, fail, date }) {
      const uid = firebase.auth().currentUser.uid
      try {
        const category = await firebase.database().ref(`users/${uid}/game_1`).push({ time, rounds, fail, date })
        return { time, rounds, fail, date, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
