import React, {Component} from 'react';
import {Form, Grid, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

import {UserContext} from "../Common/contexts";

class LoginPage extends Component {
    static contextType = UserContext;

    state = {
        email: '',
        password: '',
    };

    handleFormSubmit = () => {
        const {email, password} = this.state;

        this.context.loginUser({
            email,
            password,
        });
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    render() {
        const {email, password} = this.state;

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Form size='large' onSubmit={this.handleFormSubmit}>
                        <Segment stacked>
                            <Form.Input value={email} onChange={this.handleChange} fluid icon='user' iconPosition='left' name="email" placeholder='E-mail address' />
                            <Form.Input value={password} onChange={this.handleChange}
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                name="password"
                                type='password'
                            />

                            <Form.Button primary fluid size='large'>
                                Login
                            </Form.Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/register">Sign up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginPage;
