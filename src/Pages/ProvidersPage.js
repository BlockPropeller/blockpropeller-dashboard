import React, {Component} from 'react';
import {Button, Container, Header, Table} from "semantic-ui-react";
import {ProviderService} from "../Services";
import {Link} from "react-router-dom";

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
        const {providers} = this.state;

        return (
            <Container>
                <Header as="h1">
                    Providers
                </Header>
                <Link to="/provider/create">
                    <Button primary>Add new Provider</Button>
                </Link>
                {providers.length > 0 && <Table selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Label</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {providers.map(provider => <Table.Row style={{cursor: 'pointer'}} key={provider.id} onClick={() => this.handleRowClick(provider)}>
                            <Table.Cell>{provider.label}</Table.Cell>
                            <Table.Cell>{provider.type}</Table.Cell>
                            <Table.Cell>{provider.id}</Table.Cell>
                        </Table.Row>)}
                    </Table.Body>
                </Table>}
            </Container>
        );
    }
}

export default ProvidersPage;
