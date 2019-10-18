import Cookies from 'js-cookie';
import Api from '../Common/Api';

class UserService {
    static async getUser() {
        try {
            const {data} = await Api.get('/account/me');

            if (!data || !data.account) {
                return null;
            }

            return data.account;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async loginUser(email, password) {
        try {

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async logoutUser() {}

    static async registerUser(email, password) {}

    static setJwtToken(jwtToken) {
        if (process.env.NODE_ENV !== 'development') {
            Cookies.set('token', jwtToken, { path: '/', expires: 30, domain: '.blockpropeller.dev'});
        } else {
            Cookies.set('token', jwtToken, { path: '/', expires: 30});
        }

        Api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    }

    static removeJwtToken() {
        Cookies.remove('token');
        Cookies.remove('token', {domain: '.blockpropeller.dev'});
        Api.defaults.headers.common['Authorization'] = null;
    }
}

export default UserService;
