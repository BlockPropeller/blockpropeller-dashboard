import React, {Component} from 'react';
import {Button, Container, Header, Segment} from "semantic-ui-react";
import {ServerService} from "../Services";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        const servers = await ServerService.getAllServers();

        console.log(servers);
    }

    render() {
        return (
            <div>
                <Container>
                    <Segment>
                        <Header>
                            Servers
                        </Header>
                        <Segment.Group>
                            <Segment color='teal'>Top</Segment>
                            <Segment color='teal'>Middle</Segment>
                            <Segment color='black'>Bottom</Segment>
                        </Segment.Group>
                        <Button primary>Click Here</Button>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default HomePage;
