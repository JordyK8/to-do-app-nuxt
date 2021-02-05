export const state = () => ({
    user: {}
})

export const mutations = {
  login(state, user) {
    state.user = user.data.login
  }
}
