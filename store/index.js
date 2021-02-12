export const state = () => ({
  logged: false
})

export const mutations = {
  LoggedIn () {
    state.logged = true
  },
  loggedOut () {
    state.logged = false
  }
}
