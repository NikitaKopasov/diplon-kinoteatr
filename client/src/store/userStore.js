import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isSubscribe = false
        this._user = {}
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsSubscribe(bool) {
        this._isSubscribe = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get isSubscribe() {
        return this._isSubscribe
    }
}