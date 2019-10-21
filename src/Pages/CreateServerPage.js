import React, {Component} from 'react';
import {Container, Form, Header, Segment} from "semantic-ui-react";
import {ProviderService} from "../Services";

const NODE_NETWORK_OPTIONS = [
    {
        value: 'testnet',
        text: 'Testnet',
    },
];
const NODE_TYPE_OPTIONS = [
    {
        value: 'lightnode',
        text: 'Light Node',
    },
];
const NODE_VERSION_OPTIONS = [
    {
        value: '0.6.1',
        text: 'v0.6.1',
    },
];

class CreateServerPage extends Component {
    state = {
        loaded: false,
        providerOptions: [],
        provider: null,
        network: null,
        type: null,
        version: null,
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
        });
    };

    handleFormSubmission = async () => {
        const {version, type, network, provider} = this.state;

        if (this.isFormInvalid()) {
            return;
        }

        console.log(version, type, network, provider);
    };

    isFormInvalid = () => {
        const {version, type, network, provider} = this.state;

        return !version || !type || !network || !provider;
    };

    render() {
        const {loaded, version, type, providerOptions, network, provider} = this.state;

        return (
            <Container>
                <Header as="h1">Create Server</Header>
                <Segment stacked>
                    <Header as="h3">Provision Details</Header>
                    <Form loading={!loaded} onSubmit={this.handleFormSubmission}>
                        <Form.Select value={provider} name="provider" options={providerOptions} placeholder="Select provider" label="Provider" onChange={this.handleInputChange}/>
                        <Form.Select value={network} name="network" options={NODE_NETWORK_OPTIONS} placeholder="Select network" label="Node Network" onChange={this.handleInputChange}/>
                        <Form.Select value={type} name="type" options={NODE_TYPE_OPTIONS} placeholder="Select node type" label="Node Type" onChange={this.handleInputChange}/>
                        <Form.Select value={version} name="version" options={NODE_VERSION_OPTIONS} placeholder="Select version of node" label="Node Version" onChange={this.handleInputChange}/>
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
