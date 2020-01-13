import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: localStorage.getItem('user-token') || '',
  username: localStorage.getItem('user-name') || '',
  authorities: localStorage.getItem('authorities') || '',
  role: localStorage.getItem('user-role') || ''
 }
 
 const getters = {
  isAuthenticated: state => {
    if (
      state.username != undefined && state.username != '' 
      && state.token != undefined && state.token != ''
    ) {
      return true;
    } else {
      return false;
    }
  },
  isAdmin: state => {
    if (state.role === 'admin') {
      return true;
    } else {
      return false;
    }
  },
  getToken: state => {
    return state.token;
  },
  getUsername: state => {
    return state.username;
  },
  getAuthorities: state => {
    return state.authorities;
  }
}
 
 const mutations = {
  auth_login: (state, user) => {
    localStorage.setItem('user-token', user.token);
    localStorage.setItem('user-name', user.name);
    localStorage.setItem('user-authorities', user.authorities);
    state.token = user.token;
    state.username = user.username;
    state.authorities = user.authorities;
    var isUser = false;
    var isAdmin = false;
    for (var i = 0; i < user.authorities.length; i++) {
      if (user.authorities[i].authority === 'USER') {
        isUser = true;
      } else if (user.authorities[i].authority === 'ADMIN') {
        isAdmin = true;
      }
    }
    if (isUser) {
      localStorage.setItem('user-role', 'user');
      state.role = 'user';
    }
    if (isAdmin) {
      localStorage.setItem('user-role', 'admin');
      state.role = 'admin';
    }
  },
  auth_logout: () => {
    state.token = '';
    state.username = '';
    state.authorities = [];
    state.role = '';
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-name');
    localStorage.removeItem('user-authorities');
    localStorage.removeItem('user-role');
  }
 }
 
 const actions = {
  login: (context, user) => {
    context.commit('auth_login', user)
  },
  logout: (context) => {
    context.commit('auth_logout');
  }
 }
 
 export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
 });