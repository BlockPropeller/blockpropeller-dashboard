import React, {Component, Fragment} from 'react';
import {Button, Container, Header, Loader, Segment} from "semantic-ui-react";

import {ProviderService} from "../Services";

class ProviderPage extends Component {
    state = {
        loaded: false,
        provider: null,
    };

    async componentDidMount() {
        const {match: {params: {id}}} = this.props;

        const provider = await ProviderService.getProvider(id);

        this.setState({
            loaded: true,
            provider,
        });
    }

    render() {
        const {loaded, provider} = this.state;

        return (
            <Container>
                {!!provider && <Fragment>
                    <Header as="h1">{provider.label}</Header>
                    <Segment>
                        <Header as="h3">Details</Header>
                        <div>
                            <div>ID: {provider.id}</div>
                            <div>Label: {provider.label}</div>
                            <div>Type: {provider.type}</div>
                        </div>
                        <div>
                            <Button negative>
                                Delete Provider
                            </Button>
                        </div>
                    </Segment>
                </Fragment>}
                <Loader active={!loaded}>Loading Provider</Loader>
            </Container>
        );
    }
}

export default ProviderPage;
