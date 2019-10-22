import React, {Component, Fragment} from 'react';
import {ServerService} from "../Services";
import {Container, Grid, Header, Label, Segment} from "semantic-ui-react";
import JobStatusLabel from "../Components/JobStatusLabel/JobStatusLabel";
import {Link} from "react-router-dom";
import ServerStateLabel from "../Components/ServerStateLabel/ServerStateLabel";

class JobPage extends Component {
    state = {
        loaded: false,
        job: null,
    };

    async componentDidMount() {
        const {match: {params: {id: jobId}}} = this.props;

        const job = await ServerService.getProvisioningJob(jobId);

        this.setState({
            loaded: true,
            job,
        });
    }

    render() {
        const {loaded, job} = this.state;

        return (
            <Container>
                {!!job && <Fragment>
                    <Header as="h1">
                        Provisioning Job
                    </Header>
                    <Segment>
                        <Header as="h4">Details</Header>
                        <Grid columns="equal">
                            <Grid.Row>
                                <Grid.Column>
                                    <span>ID: </span>
                                    <Label>{job.id}</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <span>Status: </span>
                                    <JobStatusLabel job={job}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                    {!!job.error && <Segment color='red'>
                        <Header as="h4">Error</Header>
                        <code>
                            {job.error}
                        </code>
                    </Segment>}
                    <Segment>
                        <Header as="h4">Server Configuration</Header>
                        <Grid columns="equal">
                            <Grid.Row>
                                <Grid.Column>
                                    <span>Network: </span>
                                    <Label>{job.deployment.configuration.node_network}</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <span>Node Type: </span>
                                    <Label>{job.deployment.configuration.node_type}</Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <span>Node Version: </span>
                                    <Label>{job.deployment.configuration.node_version}</Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        {!!job.server && <Segment secondary>
                            <Header as="h3">{job.server.name}</Header>
                            <Grid columns="equal" >
                                <Grid.Row>
                                    <Grid.Column float="left">
                                        <div>
                                            <span>State: </span>
                                            <ServerStateLabel server={job.server}/>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column float="left">
                                        <span>Provider: </span>
                                        <Label>{job.server.provider}</Label>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Link to={`/server/${job.server.id}`}>View Server</Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>}
                    </Segment>
                </Fragment>}
            </Container>
        );
    }
}

export default JobPage;
