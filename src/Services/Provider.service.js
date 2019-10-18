import Api from '../Common/Api';

class ProviderService {
    static async getSupportedProviders() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    static async getAllProviders() {
        try {
            const {data} = await Api.get('/api/v1/provider/settings');

            if (!data || !data.provider_settings) {
                return [];
            }

            return data.provider_settings;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getProvider(providerId) {
        try {
            const {data} = await Api.get(`/api/v1/provider/settings/${providerId}`);

            if (!data || !data.provider_settings) {
                return null;
            }

            return data.provider_settings;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createProvider(data) {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    static async deleteProvider(providerId) {
        try {

        } catch (error) {
            console.error(error);
        }
    }
}

export default ProviderService;
