import Api from '../Common/Api';

const NODE_VERSIONS_MAP = {
    "binance-lightnode-testnet": ['0.5.8', '0.6.0', '0.6.1'],
    "binance-lightnode-prod": ['0.5.8', '0.6.0'],
    "binance-fullnode-testnet": ['0.5.8', '0.5.10', '0.6.0', '0.6.1'],
    "binance-fullnode-prod": ['0.5.8', '0.5.9', '0.5.10', '0.6.0', '0.6.1'],
};

class ServerService {
    static async getAllServers() {
        try {
            const {data} = await Api.get("/api/v1/server");

            if (!data || !data.servers) {
                return [];
            }

            return data.servers;
        } catch (error) {
            console.error(error);

            return [];
        }
    }

    static getVersionsForNode(type, network) {
        try {
            const repoName = `binance-${type}-${network}`;

            return NODE_VERSIONS_MAP[repoName];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getAllProvisioningJobs() {
        try {
            const {data} = await Api.get("/api/v1/provision/job");

            if (!data || !data.jobs) {
                return [];
            }

            return data.jobs;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getProvisioningJob(jobId) {
        try {
            const {data} = await Api.get(`/api/v1/provision/job/${jobId}`);

            if (!data || !data.job) {
                return null;
            }

            return data.job;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async provisionServer(providerId, network, type, version) {
        try {
            const {data} = await Api.post("/api/v1/provision/job", {
                provider_id: providerId,
                node_network: network,
                node_type: type,
                node_version: version,
            });

            console.log(data);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default ServerService;
