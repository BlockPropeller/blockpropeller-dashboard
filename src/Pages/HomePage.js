import React, {Component} from 'react';
import {Button, Container, Header, Icon, Label, Loader, Segment} from "semantic-ui-react";
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

        console.log(jobs);

        return (
            <Container>
                <Segment>
                    <Header as='h3'>
                        Servers
                    </Header>
                    <Link to="/server/create">
                        <Button primary>Create Server</Button>
                    </Link>
                    {servers.length > 0 && <Segment.Group>
                        {servers.map(server => <Segment key={server.id} as={Link} style={{display:'block'}}  to={`/server/${server.id}`}>
                            <div>{server.name}</div>
                            <div>{server.created_at}</div>
                            <div>
                                {server.state === 'requested' && <Label color="orange">
                                    Provisioning Server
                                </Label>}
                                {server.state === 'ok' && <Label color="teal">
                                    Running
                                </Label>}
                                {server.state === 'deleted' && <Label color="grey">
                                    Archived
                                </Label>}
                                {server.state === 'failed' && <Label color="red">
                                    Provision Failed
                                </Label>}
                            </div>
                        </Segment>)}
                    </Segment.Group>}
                    {servers.length === 0 && <Segment placeholder>
                        <Header icon>
                            <Icon name='server' />
                            No servers have been created yet
                        </Header>
                    </Segment>}
                    <Loader active={!loaded}/>

                </Segment>
                {jobs.length > 0 && <Segment>
                    <Header as='h3' style={{margin: '0'}}>
                        Active Provision Jobs
                    </Header>
                    <Segment.Group>
                        {jobs.map(job => <Segment key={job.id}>
                            <div>{job.id}</div>
                            <div>
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
                            </div>
                            <div>{job.server.name}</div>
                        </Segment>)}
                    </Segment.Group>
                </Segment>}
            </Container>
        );
    }
}

export default HomePage;
