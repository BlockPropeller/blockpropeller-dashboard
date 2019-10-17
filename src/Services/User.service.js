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
            return null;
        }
    }
}

export default UserService;
