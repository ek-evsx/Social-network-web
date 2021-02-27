import request from '../helpers/api';

import { IActionPayload } from './types';

interface IAuth {
    user: {};
    isAuthorized: Boolean;
}

interface ILoginPayload {
    login: string;
    password: string;
}

export const state = () => ({
    user: {},
    isAuthorized: false
});

export const mutations = {
    login(state: IAuth, user: {}) {
        state.user = user;
        state.isAuthorized = true;
    },
    logout(state: IAuth) {
        state.user = {};
        state.isAuthorized = false;
    }
};
export const actions = {
    async login({ commit }: IActionPayload, payload: ILoginPayload) {
        try {
            const { isAuthorized } = await request._authorize(payload);
            const data = request.parseToken();

            console.log('isAuthorized', isAuthorized, data);

            commit('login');
        } catch (e) {
            console.error(e);
        }
    },
    logout({ commit }: IActionPayload) {
        commit('logout');
    }
};
