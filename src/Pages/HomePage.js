import React, {Component} from 'react';
import {Button, Container, Header, Loader, Segment} from "semantic-ui-react";
import {ServerService} from "../Services";

class HomePage extends Component {
    state = {
        servers: [],
        loaded: false,
    };

    async componentDidMount() {
        const servers = await ServerService.getAllServers();

        this.setState({
            servers,
            loaded: true,
        });
    }

    render() {
        const {servers, loaded} = this.state;

        return (
            <div>
                <Container>
                    <Segment>
                        <Loader active={!loaded}/>
                        <Header>
                            Servers
                        </Header>
                        <Segment.Group>
                            {servers.map(server => <Segment key={server.id} color='teal'>Server</Segment>)}
                        </Segment.Group>
                        <Button primary>Click Here</Button>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default HomePage;
