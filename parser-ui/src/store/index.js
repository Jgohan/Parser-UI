import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const roles = {
  user: window.btoa('ghjcnj.pth'),
  admin: window.btoa('ghjcnjflvby')
}

const state = {
  token: sessionStorage['user-token'] || '',
  username: sessionStorage['user-name'] || '',
  role: sessionStorage['user-role'] || ''
 }
 
 const getters = {
  isAuthenticated: state => {
    if (
      state.token != undefined && state.token != ''
      && state.username != undefined && state.username != '' 
      && state.role != undefined && state.role != ''
    ) {
      return true
    } else {
      return false
    }
  },
  isAdmin: state => {
    if (state.role === roles.admin) {
      return true
    } else {
      return false
    }
  },
  getUsername: state => {
    return state.username
  },
  getToken: state => {
    return state.token
  }
}
 
 const mutations = {
  auth_login: (state, user) => {
    sessionStorage['user-token'] = user.token
    state.token = sessionStorage['user-token']

    sessionStorage['user-name'] = user.username
    state.username = sessionStorage['user-name']

    if (user.role === '[USER]') {
      sessionStorage['user-role'] = roles.user
    } else if (user.role === '[ADMIN]') {
      sessionStorage['user-role'] = roles.admin
    }
    state.role = sessionStorage['user-role']
  },
  auth_logout: () => {
    state.token = ''
    state.username = ''
    state.role = ''
    delete sessionStorage['user-token']
    delete sessionStorage['user-name']
    delete sessionStorage['user-role']
  }
 }
 
 const actions = {
  login: (context, user) => {
    context.commit('auth_login', user)
  },
  logout: (context) => {
    context.commit('auth_logout')
  }
 }
 
 export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
 })