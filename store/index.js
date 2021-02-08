/* eslint-disable no-param-reassign */
export const state = () => ({
  user: '',
});

export const mutations = {
  // eslint-disable-next-line no-shadow
  login(state, user) {
    state.user = user;
  },
  // eslint-disable-next-line no-shadow
  logout(state) {
    state.user = '';
  },
};
