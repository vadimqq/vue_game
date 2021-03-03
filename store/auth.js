import firebase from 'firebase/app'

export const state = () => ({
  user: null,
  error: null
})

export const actions = {
  async login ({ dispatch, commit }, { email, password }) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async register ({ dispatch, commit }, { email, password, name }) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const uid = await dispatch('getUid')
      await firebase.database().ref(`/users/${uid}/info`).set({
        name
      })
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async logout ({ commit }) {
    await firebase.auth().signOut()
  },
  getUid () {
    const user = firebase.auth().currentUser
    return user ? user.uid : null
  },
  getUser () {
    const user = firebase.auth().currentUser
    return user || null
  }
}

export const mutations = {
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  },
  setUser (state, user) {
    state.user = user
  }
}

export const getters = {
  getUser: state => state.user
}
