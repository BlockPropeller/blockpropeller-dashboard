import React, {Component} from 'react';
import {Form, Grid, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {UserContext} from "../Common/contexts";

class RegisterPage extends Component {
    static contextType = UserContext;

    handleFormSubmit = (data) => {
    };

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size='large' onSubmit={this.handleFormSubmit}>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Form.Button secondary fluid size='large'>
                                Create Account
                            </Form.Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have an account? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default RegisterPage;
