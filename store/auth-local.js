export const state = () => ({
    token:'',
    email:'',
    name:'',
    phone:'',
    package:''
  })
  
export const mutations = {
SET_TOKEN (state, val) {
    state.token = val
},

SET_NAME (state, val) {
    state.name = val
},

SET_EMAIL (state, val) {
    state.email = val
},

SET_PHONE (state, val) {
    state.phone = val
},

SET_LOGOUT (state) {
    state.token = ''
    state.email = ''
    state.name = ''
    state.phone = ''
    state.package = ''
}
}

export const actions = {
setToken ({commit}, val) {
    commit('SET_TOKEN', val)
},

setName ({commit}, val) {
    commit('SET_NAME', val)
},

setEmail ({commit}, val) {
    commit('SET_EMAIL', val)
},

setPhone ({commit}, val) {
    commit('SET_PHONE', val)
},

setLogout ({commit}) {
    commit('SET_LOGOUT')
}
}

export const getters = {
token:state => state.token,
name:state => state.name,
email:state => state.email,
phone:state => state.phone
}

export const strict = false