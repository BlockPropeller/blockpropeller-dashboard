import React, {Component} from 'react';
import {Container, Header, Loader, Segment, Table} from "semantic-ui-react";
import {ProviderService} from "../Services";

class ProvidersPage extends Component {
    state = {
        loaded: false,
        providers: [],
    };

    async componentDidMount() {
        const providers = await ProviderService.getAllProviders();

        this.setState({
            loaded: true,
            providers,
        });
    }

    handleRowClick = (provider) => {
        const {history} = this.props;

        history.push(`/provider/${provider.id}`);
    };

    render() {
        const {loaded, providers} = this.state;

        return (
            <Container>
                <Header as="h1">
                    Providers
                </Header>
                <Segment>
                    <Header as="h3">List of active providers</Header>
                    {providers.length > 0 && <Table selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Label</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {providers.map(provider => <Table.Row key={provider.id} onClick={() => this.handleRowClick(provider)}>
                                <Table.Cell>{provider.id}</Table.Cell>
                                <Table.Cell>{provider.label}</Table.Cell>
                                <Table.Cell>{provider.type}</Table.Cell>
                            </Table.Row>)}
                        </Table.Body>
                    </Table>}
                    <Loader active={!loaded}/>
                </Segment>
            </Container>
        );
    }
}

export default ProvidersPage;
