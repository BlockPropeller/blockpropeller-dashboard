import React, {Component, Fragment} from 'react';
import {Button, Container, Grid, Header, Icon, Loader, Segment} from "semantic-ui-react";
import {ServerService} from "../Services";
import {Link} from "react-router-dom";
import JobStatusLabel from "../Components/JobStatusLabel/JobStatusLabel";
import ServerStateLabel from "../Components/ServerStateLabel/ServerStateLabel";

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

        if (!loaded) {
            return <Loader active  size='large'>Loading Servers</Loader>;
        }

        return (
            <Container>
                <Header as='h1'>
                    Servers
                </Header>
                <Link to="/server/create">
                    <Button secondary>Create New Server</Button>
                </Link>
                {servers.length > 0 && <Segment.Group>
                    {servers.map(server => <Segment key={server.id} as={Link} style={{display:'block'}}  to={`/server/${server.id}`}>
                        <Grid columns="equal">
                            <Grid.Row verticalAlign="middle">
                                <Grid.Column><strong><Header as='h4'>{server.name}</Header></strong></Grid.Column>
                                <Grid.Column>{server.created_at}</Grid.Column>
                                <Grid.Column>
                                    <ServerStateLabel server={server}/>
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
                {jobs.length > 0 && <Fragment>
                    <Header as='h1'>
                        Provisioning Jobs
                    </Header>
                    <Segment.Group>
                        {jobs.map(job => <Segment key={job.id} as={Link} style={{display:'block'}}  to={`/job/${job.id}`}>
                            <Grid columns="equal">
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column>{job.id}</Grid.Column>
                                    <Grid.Column>
                                        <JobStatusLabel job={job}/>
                                    </Grid.Column>
                                    <Grid.Column>{job.server.name}</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>)}
                    </Segment.Group>
                </Fragment>}
            </Container>
        );
    }
}

export default HomePage;
