// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {
            userId: 1,
            userName: "景元奎"
        }
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.userInfo = payload;
        },
    },
    actions: {
        
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    }
});

export default store;
