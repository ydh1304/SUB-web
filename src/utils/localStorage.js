/* @flow */

import store from 'store/dist/store.modern';

const namespace = 'promises';

export const KEYS = {
  accessToken: 'access_token',
};

const get = (key) => store.get(`@${namespace}:${key}`);
const set = (key, value) => store.set(`@${namespace}:${key}`, value);
const remove = (key) => store.remove(`@${namespace}:${key}`);
const clearAll = () => store.clearAll();


export const getToken = () => get(KEYS.accessToken);

export const saveToken = payload => set(KEYS.accessToken, payload.token);

export const removeToken = () => remove(KEYS.accessToken);

export const getUsername = () => get(KEYS.username);

export const saveUsername = username => set(KEYS.username, username);

export const removeUsername = () => remove(KEYS.username);

export const getUserId = () => get(KEYS.userId);

export const saveUserId = userId => set(KEYS.userId, userId);

export const removeUserId = () => remove(KEYS.userId);
