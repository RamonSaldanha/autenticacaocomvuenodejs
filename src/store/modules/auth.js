import { HTTP } from '@/http';

const state = {
  user: {},
  token: ''
}

const getters = {
  user: state => state.user,
  token: state => state.token
}

const actions = {

  login({ commit }, payload) {
    return HTTP
      .post('auth/login', payload)
      .then(res => {
        commit('setUser', res.data.user)
        commit('setToken', res.data.token)
        localStorage.setItem('token', res.data.token)
        return Promise.resolve(res.data.token)
      }).catch( err => {
        return Promise.reject( err.response.data.error)
      })
  },
  
  getAuthProfile ({ commit }) {  
    return HTTP.get('/auth/profile', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(function (res) {
      commit('setUser', res.data.user)
      commit('setToken', res.data.token)
    }).catch(function (err) {
      return Promise.reject( err.response.data.error)
    });
  }

}

const mutations = {
  setUser (state, user) {
    state.user = user;
  },
  setToken (state, token) {
    state.token = token;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}