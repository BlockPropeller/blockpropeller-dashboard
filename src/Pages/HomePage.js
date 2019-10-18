import React, {Component} from 'react';
import {Button, Container, Header, Icon, Loader, Segment} from "semantic-ui-react";
import {ServerService} from "../Services";
import {Link} from "react-router-dom";

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
            <Container>
                <Segment>
                    <div>
                        <Header as='h3' style={{margin: '0'}}>
                            Servers
                        </Header>
                        <p>qweqweqwe</p>
                    </div>
                    {servers.length > 0 && <Segment.Group>
                        {servers.map(server => <Segment key={server.id} color='teal'>Server</Segment>)}
                        <Button primary>Click Here</Button>
                    </Segment.Group>}
                    {servers.length === 0 && <Segment placeholder>
                        <Header icon>
                            <Icon name='server' />
                            No servers have been created yet
                        </Header>
                        <Link to="/server/create">
                            <Button primary>Create Server</Button>
                        </Link>
                    </Segment>}
                    <Loader active={!loaded}/>
                </Segment>
            </Container>
        );
    }
}

export default HomePage;
