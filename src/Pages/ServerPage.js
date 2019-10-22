import React, {Component, Fragment} from 'react';
import {Container, Grid, Header, Label, Segment, Table} from "semantic-ui-react";
import {ServerService} from "../Services";
import ServerStateLabel from "../Components/ServerStateLabel/ServerStateLabel";

class ServerPage extends Component {
    state = {
        loaded: false,
        server: null,
    };

    async componentDidMount() {
        const {match: {params: {id: serverId}}} = this.props;

        const server = await ServerService.getServer(serverId);

        this.setState({
            loaded: true,
            server,
        });
    }

    render() {
        const {server} = this.state;

        return (
            <Container>
                <Header as="h1">Server</Header>
                {!!server && <Fragment>
                    <Segment>
                        <Header as="h3">Information</Header>
                        <Grid columns="equal">
                            <Grid.Row>
                                <Grid.Column>
                                    <span>Name: </span>
                                    <strong>{server.name}</strong>
                                </Grid.Column>
                                <Grid.Column>
                                    <span>State: </span>
                                    <ServerStateLabel server={server}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <span>Provider: </span>
                                    <Label>{server.provider}</Label>
                                </Grid.Column>
                            </Grid.Row>
                            {!!server.ip_address && <Grid.Row>
                                <Grid.Column>
                                    <strong>IP Address: </strong>
                                    <a href={`http://${server.ip_address}`} rel="noopener noreferrer" target="_blank">{server.ip_address}</a>
                                </Grid.Column>
                            </Grid.Row>}
                            <Grid.Row>
                                <Grid.Column>
                                    <span>ID: </span>
                                    <Label>{server.id}</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <span>SSH Key: </span>
                                    <Label>{server.ssh_key.name}</Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    <Segment>
                        <Header as="h3">Deployments</Header>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                    <Table.HeaderCell>State</Table.HeaderCell>
                                    <Table.HeaderCell>Timestamp</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {server.deployments.map(deployment => <Table.Row key={deployment.id}>
                                    <Table.Cell>{deployment.id}</Table.Cell>
                                    <Table.Cell>{deployment.type}</Table.Cell>
                                    <Table.Cell><ServerStateLabel server={deployment}/></Table.Cell>
                                    <Table.Cell>{deployment.created_at}</Table.Cell>
                                </Table.Row>)}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Fragment>}
            </Container>
        );
    }
}

export default ServerPage;
