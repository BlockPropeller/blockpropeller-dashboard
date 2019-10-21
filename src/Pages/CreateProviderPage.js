import React, {Component} from 'react';
import {Container, Dimmer, Dropdown, Form, Header, Loader, Segment, Select} from "semantic-ui-react";
import {ProviderService} from "../Services";

const ProviderOptionsMap = {
    "digitalocean": {
        icon: "digital ocean",
        value: "digitalocean",
        text: "DigitalOcean",
    },
};

class CreateProviderPage extends Component {
    state = {
        loaded: false,
        providerOptions: [],
        name: '',
        credentials: '',
        type: null,
    };

    async componentDidMount() {
        const supportedProviders = await ProviderService.getSupportedProviders();

        this.setState({
            loaded: true,
            providerOptions: supportedProviders.map(providerKey => ProviderOptionsMap[providerKey]),
        });
    }

    handleFormInputChange = (e, {name, value}) => {
        this.setState({
            [name]: value,
        });
    };

    render() {
        const {name, credentials, type, loaded, providerOptions} = this.state;

        return (
            <Container>
                <Header as="h1">
                    Create Provider
                </Header>
                <Segment>
                    <Form>
                        <Form.Input value={name} name="name" placeholder="Set name for this provider" onChange={this.handleFormInputChange}/>
                        <Dropdown selection fluid value={type} name="type" placeholder='Select Provider Type' options={providerOptions}  onChange={this.handleFormInputChange}/>
                        <Form.Input value={credentials} name="credentials" placeholder="Credentials (API key, token)" onChange={this.handleFormInputChange}/>
                        <Form.Button primary>
                            Create
                        </Form.Button>
                    </Form>
                    <Dimmer active={!loaded} inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                </Segment>
            </Container>
        );
    }
}

export default CreateProviderPage;
