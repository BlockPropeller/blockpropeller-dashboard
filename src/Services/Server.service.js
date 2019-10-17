import Api from '../Common/Api';

class ServerService {
    static async getAllServers() {
        try {
            const {data} = await Api.get("/server");

            if (!data || !data.servers) {
                return [];
            }

            return data.servers;
        } catch (error) {
            console.error(error);

            return [];
        }
    }
}

export default ServerService;
