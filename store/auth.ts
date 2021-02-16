import request from '../helpers/api';

import { IActionPayload } from './types';

interface IAuth {
    user: {};
    isAuthorized: Boolean;
}

interface ILoginPayload {
    login: String;
    password: String;
}

export const auth = {
    state: () => ({
        user: {},
        isAuthorized: false
    }),
    mutations: {
        login(state: IAuth, user: {}) {
            state.user = user;
            state.isAuthorized = true;
        },
        logout(state: IAuth) {
            state.user = {};
            state.isAuthorized = false;
        }
    },
    actions: {
        async login({ commit }: IActionPayload, payload: ILoginPayload) {
            const user = await request.post('auth/login', payload);

            commit('login', user);
        },
        logout({ commit }: IActionPayload) {
            commit('logout');
        }
    }
};
