import { Cookies } from 'react-cookie';

class UserAuth {
    constructor() {
        this.isAuthenticated = false
        this.currentUser = {}

    }

    getUser() {
        return Cookies
    }

    setUser(data) {
        Cookies.set('info', data, { path: '/' });
    }

    isAuth() {
        return this.Cookies.get("info").loggedIn
    }
}

export default new UserAuth()