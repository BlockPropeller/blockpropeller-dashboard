import React, {Component} from 'react';
import {Form, Grid, Message, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {UserContext} from "../Common/contexts";
import Logo from "../Components/Header/LogoSymbol.jpg";

class RegisterPage extends Component {
    static contextType = UserContext;

    handleFormSubmit = (data) => {
    };

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <img src={Logo} width={120} height={120} alt="BlockPropeller Logo" style={{
                        marginBottom: '30px',
                        borderRadius: '8px',
                    }}/>
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
