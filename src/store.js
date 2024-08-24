// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {
            userId: 888,
            userName: "userName"
        }
    },
    mutations: {
        /**
         * 更新用户信息，放入Vuex的同时要放入SessionStorage
         * @param {*} state 
         * @param {*} payload 
         */
        updateUserInfo(state, payload) {
            state.userInfo = payload;
            let onlineUserKey = 'onlineUserKey';

            // 清除原有缓存数据
            sessionStorage.removeItem(onlineUserKey);
            // 放入新的数据
            sessionStorage.setItem(onlineUserKey, state.userInfo);
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
