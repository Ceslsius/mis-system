/****************************************************************
 * created by Celsius on 2020-08-11 for store entry file
 ****************************************************************/

import Vue from "vue";
import Vuex from "vuex";
import LongStore from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [LongStore()],
    strict: false,
    modules: {
        common: {
            namespaced: true,
            state: {
                userInfo: {}
            },
            getters: {
                getUserInfo: state => state.userInfo || {}
            },
            actions: {
                setUserInfo({commit}, user) {
                    commit('mutationUserInfo', user);
                }
            },
            mutations: {
                mutationUserInfo(state, user) {
                    state.userInfo = user;
                }
            }
        }
    }
});

export default store;