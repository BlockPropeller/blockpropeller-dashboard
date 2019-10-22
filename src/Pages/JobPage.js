import React, {Component} from 'react';
import {ServerService} from "../Services";
import {Container, Header, Segment} from "semantic-ui-react";

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
                <Header as="h1">
                    Provision Job
                </Header>
                {!!job && <Segment>
                    <Header as="h3">
                        Job: {job.id}
                    </Header>
                </Segment>}
            </Container>
        );
    }
}

export default JobPage;
