import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userData: localStorage.user ? JSON.parse(localStorage.user) : {}
    },
    mutations: {
        logout(state) {
            localStorage.user = ''
        },
        setUserData(state, payload) {
            localStorage.user = JSON.stringify(payload)
            state.userData = payload
        }
    },
    actions: {
        setLogout(context) {
            context.commit('logout')
        },
        setUserData(context, args) {
            context.commit('setUserData', args)
        }
    }
})
