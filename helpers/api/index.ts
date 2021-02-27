import querystring, { ParsedUrlQueryInput } from 'querystring';
import moment from 'moment';

interface IRequest {
    post: (route: string, payload: any) => void;
}

const REQUEST_METHODS_MAP = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

class Request implements IRequest {
    private __token = '';
    private __baseUrl = 'http://localhost:9000/api';
    private __expiresIn = null;

    private __isAutorized() {
        if (!this.__expiresIn) {
            return false;
        }

        return moment(this.__expiresIn) > moment();
    }

    private __refreshToken() {
        return Promise.reject({});
    }

    private async __request({
        method,
        route,
        payload,
        query = {}
    }: {
        method: string;
        route: string;
        payload?: any;
        query?: ParsedUrlQueryInput;
    }) {
        if (!this.__isAutorized()) {
            return this.__refreshToken();
        }

        let url = `${this.__baseUrl}/${route}`;
        let queryString = querystring.stringify(query);

        if (query) {
            url += `?${queryString}`;
        }

        try {
            const response = await fetch(url, {
                method,
                body: JSON.stringify(payload),
                headers: {
                    Authorization: `Bearer ${this.__token}`
                }
            });
            const parsedResponse = await response.json();

            return parsedResponse.data;
        } catch (e) {
            throw e;
        }
    }

    async _authorize(data: { login: string; password: string }) {
        try {
            const response = await fetch(`${this.__baseUrl}/auth/login`, {
                method: REQUEST_METHODS_MAP.POST,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { access_token, expiresIn } = await response.json();

            this.__token = access_token;
            this.__expiresIn = expiresIn;

            return { isAuthorized: true };
        } catch (e) {
            throw e;
        }
    }

    getToken() {
        return this.__token;
    }

    parseToken() {
        return JSON.parse(atob(this.__token.split('.')[1]));
    }

    get(route: string, query: ParsedUrlQueryInput = {}) {
        try {
            return this.__request({
                method: REQUEST_METHODS_MAP.GET,
                route,
                query
            });
        } catch (e) {
            throw e;
        }
    }

    post(route: string, payload: any, query: ParsedUrlQueryInput = {}) {
        try {
            return this.__request({
                method: REQUEST_METHODS_MAP.POST,
                route,
                payload,
                query
            });
        } catch (e) {
            throw e;
        }
    }

    put(route: string, payload: any, query: ParsedUrlQueryInput = {}) {
        try {
            return this.__request({
                method: REQUEST_METHODS_MAP.PUT,
                route,
                payload,
                query
            });
        } catch (e) {
            throw e;
        }
    }

    delete(route: string, payload: any, query: ParsedUrlQueryInput = {}) {
        try {
            return this.__request({
                method: REQUEST_METHODS_MAP.DELETE,
                route,
                payload,
                query
            });
        } catch (e) {
            throw e;
        }
    }
}

const request = new Request();

export default request;
