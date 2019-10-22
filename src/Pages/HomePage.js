import React, {Component, Fragment} from 'react';
import {Button, Container, Grid, Header, Icon, Label, Loader, Segment} from "semantic-ui-react";
import {ServerService} from "../Services";
import {Link} from "react-router-dom";

class HomePage extends Component {
    state = {
        servers: [],
        jobs: [],
        loaded: false,
    };

    async componentDidMount() {
        const servers = await ServerService.getAllServers();
        const jobs = await ServerService.getAllProvisioningJobs();

        this.setState({
            servers,
            jobs,
            loaded: true,
        });
    }

    render() {
        const {servers, jobs, loaded} = this.state;

        return (
            <Container>
                <Header as='h1'>
                    Servers
                </Header>
                <Segment>
                    {servers.length > 0 && <Segment.Group>
                        {servers.map(server => <Segment key={server.id} as={Link} style={{display:'block'}}  to={`/server/${server.id}`}>
                            <Grid columns="equal">
                                <Grid.Row>
                                    <Grid.Column>{server.name}</Grid.Column>
                                    <Grid.Column>{server.created_at}</Grid.Column>
                                    <Grid.Column>
                                        {server.state === 'requested' && <Label color="orange">
                                            Provisioning Server
                                        </Label>}
                                        {server.state === 'ok' && <Label color="green">
                                            Running
                                        </Label>}
                                        {server.state === 'deleted' && <Label color="grey">
                                            Archived
                                        </Label>}
                                        {server.state === 'failed' && <Label color="red">
                                            Provision Failed
                                        </Label>}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>)}
                    </Segment.Group>}
                    {servers.length === 0 && <Segment placeholder>
                        <Header icon>
                            <Icon name='server' />
                            No servers have been created yet
                        </Header>
                    </Segment>}
                    <Link to="/server/create">
                        <Button primary>Create New Server</Button>
                    </Link>
                    <Loader active={!loaded}/>
                </Segment>
                {jobs.length > 0 && <Fragment>
                    <Header as='h1'>
                        Active Provision Jobs
                    </Header>
                    <Segment>
                        <Segment.Group>
                            {jobs.map(job => <Segment key={job.id} as={Link} style={{display:'block'}}  to={`/job/${job.id}`}>
                                <Grid columns="equal">
                                    <Grid.Row>
                                        <Grid.Column>{job.id}</Grid.Column>
                                        <Grid.Column>
                                            {job.state === 'job_created' && <Label color="orange">
                                                Creating Server
                                            </Label>}
                                            {job.state === 'server_created' && <Label color="orange">
                                                Running Provision
                                            </Label>}
                                            {job.state === 'completed' && <Label color="green">
                                                Provision Completed
                                            </Label>}
                                            {job.state === 'failed' && <Label color="red">
                                                Provision Failed
                                            </Label>}
                                        </Grid.Column>
                                        <Grid.Column>{job.server.name}</Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>)}
                        </Segment.Group>
                    </Segment>
                </Fragment>}
            </Container>
        );
    }
}

export default HomePage;
