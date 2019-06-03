import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        popup_login: false,
        popup_register: false,
        popup_findpwd: false
    },
    mutations: {//Mutation 必须是同步函数
        POPUP_LOGIN (state) {
            state.popup_register = false;
            state.popup_findpwd = false;
            state.popup_login = true
        },
        CLOSE_POPUP_LOGIN (state) {
            state.popup_login = false
        },
        POPUP_REGISTER (state) {
            state.popup_login = false;
            state.popup_findpwd = false;
            state.popup_register = true
        },
        CLOSE_POPUP_REGISTER (state) {
            state.popup_register = false
        },
        POPUP_FINDPWD (state) {
            state.popup_login = false;
            state.popup_register = false;
            state.popup_findpwd = true
        },
        CLOSE_POPUP_FINDPWD (state) {
            state.popup_findpwd = false
        }
    },
    actions: {//Action 可以包含任意异步操作

    }
})
