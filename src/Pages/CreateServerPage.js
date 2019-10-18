import React, {Component} from 'react';
import {Container, Form, Header, Segment} from "semantic-ui-react";

class CreateServerPage extends Component {
    render() {
        return (
            <Container>
                <Header as="h1">Create Server</Header>
                <Segment stacked>
                    <Header as="h3">Server Details</Header>
                    <Form>
                        <Form.Input/>
                        <Form.Button primary>
                            Create
                        </Form.Button>
                    </Form>
                </Segment>
            </Container>
        );
    }
}

export default CreateServerPage;
