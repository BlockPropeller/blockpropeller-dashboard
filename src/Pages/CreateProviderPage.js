import React, {Component} from 'react';
import {Container, Form, Header, Segment} from "semantic-ui-react";
import {ProviderService} from "../Services";
import {Redirect} from "react-router-dom";

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
        created: false,
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

    handleFormSubmission = async () => {
        const {name, credentials, type} = this.state;

        if (this.isFormInvalid()) {
            return;
        }

        this.setState({
            loaded: false,
        });

        const success = await ProviderService.createProvider(name, credentials, type);

        if (success) {
            this.setState({
               created: true,
            });
        } else {
            this.setState({
                loaded: true,
            });
        }
    };

    isFormInvalid = () => {
        const {name, credentials, type} = this.state;

        return !name || !credentials || !type;
    };

    render() {
        const {name, created, credentials, type, loaded, providerOptions} = this.state;

        if (created) {
            return <Redirect to="/providers"/>
        }

        return (
            <Container>
                <Header as="h1">
                    Create Provider
                </Header>
                <Segment>
                    <Form onSubmit={this.handleFormSubmission} loading={!loaded}>
                        <Form.Input value={name} label="Provider Name" name="name" placeholder="Set name for this provider" onChange={this.handleFormInputChange}/>
                        <Form.Select selection fluid value={type} name="type" placeholder='Select Provider Type' options={providerOptions}  onChange={this.handleFormInputChange}/>
                        <Form.Input value={credentials} name="credentials" placeholder="Credentials (API key, token)" onChange={this.handleFormInputChange}/>
                        <Form.Button primary disabled={this.isFormInvalid()}>
                            Create
                        </Form.Button>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

export default CreateProviderPage;
