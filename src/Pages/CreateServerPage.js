import React, {Component} from 'react';
import {Container, Form, Header, Segment} from "semantic-ui-react";
import {ProviderService, ServerService} from "../Services";
import {Redirect} from "react-router-dom";

const NODE_NETWORK_OPTIONS = [
    {
        value: 'testnet',
        text: 'Testnet',
    },
    {
        value: 'prod',
        text: 'Production',
    },
];
const NODE_TYPE_OPTIONS = [
    {
        value: 'lightnode',
        text: 'Light Node',
    },
    {
        value: 'fullnode',
        text: 'Full Node',
    },
];

class CreateServerPage extends Component {
    state = {
        loaded: false,
        providerOptions: [],
        versionOptions: [],
        provider: null,
        network: null,
        type: null,
        version: null,
        created: false,
    };

    async componentDidMount() {
        const providers = await ProviderService.getAllProviders();

        this.setState({
            loaded: true,
            providerOptions: providers.map(provider => ({
                value: provider.id,
                text: provider.label,
                label: provider.type,
            })),
        });
    }

    handleInputChange = (e, {name, value}) => {
        this.setState({
            [name]: value,
        }, () => {
            if (['network', 'type'].includes(name)) {
                this.fetchNodeVersions();
            }
        });
    };

    fetchNodeVersions = () => {
        const {network, type} = this.state;

        if (!network || !type) return;

        const versions = ServerService.getVersionsForNode(type, network);

        this.setState({
            version: null,
            versionOptions: versions.map(version => ({
                text: `v${version}`,
                value: version,
            }))
        });
    };

    handleFormSubmission = async () => {
        const {version, type, network, provider} = this.state;

        if (this.isFormInvalid()) {
            return;
        }

        const job = await ServerService.provisionServer(provider, network, type, version);

        if (job) {
            this.setState({
                created: true,
                createdJob: job,
            });
        }
    };

    isFormInvalid = () => {
        const {version, type, network, provider} = this.state;

        return !version || !type || !network || !provider;
    };

    render() {
        const {loaded, created, version, type, providerOptions, versionOptions, network, provider} = this.state;

        if (created) {
            return <Redirect to="/"/>;
        }

        return (
            <Container>
                <Header as="h1">Create Server</Header>
                <Segment stacked>
                    <Header as="h3">Provision Details</Header>
                    <Form loading={!loaded} onSubmit={this.handleFormSubmission}>
                        <Form.Select value={provider} name="provider" options={providerOptions} placeholder="Select provider" label="Provider" onChange={this.handleInputChange}/>
                        <Form.Select value={network} name="network" options={NODE_NETWORK_OPTIONS} placeholder="Select network" label="Node Network" onChange={this.handleInputChange}/>
                        <Form.Select value={type} name="type" options={NODE_TYPE_OPTIONS} placeholder="Select node type" label="Node Type" onChange={this.handleInputChange}/>
                        <Form.Select value={version} name="version" options={versionOptions} disabled={!type || !network} placeholder="Select version of node" label="Node Version" onChange={this.handleInputChange}/>
                        <Form.Button primary disabled={this.isFormInvalid()}>
                            Provision Server
                        </Form.Button>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

export default CreateServerPage;
