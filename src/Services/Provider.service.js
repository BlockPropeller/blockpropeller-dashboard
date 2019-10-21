import Api from '../Common/Api';

class ProviderService {
    static async getSupportedProviders() {
        try {
            const {data} = await Api.get('/api/v1/provider/types');

            if (!data || !data.provider_types) {
                return [];
            }

            return data.provider_types;
        } catch (error) {
            console.error(error);
            return [];
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

    static async createProvider(name, credentials, type) {
        try {
            const {data} = await Api.post('/api/v1/provider/settings', {
                label: name,
                provider_type: type,
                credentials: credentials,
            });

            if (!data || !data.provider_settings) {
                return false;
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
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
