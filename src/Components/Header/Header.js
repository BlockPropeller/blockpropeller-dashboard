import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Container, Menu} from "semantic-ui-react";
import {UserContext} from "../../Common/contexts";

import Logo from './LogoSymbol.jpg';

class Header extends Component {
    static contextType = UserContext;

    render() {
        const {user, logoutUser} = this.context;

        return <Menu>
            <Container>
                <Menu.Item>
                    <img src={Logo} style={{
                        borderRadius: '4px',
                        marginRight: '10px',
                    }} width={40} heigh="40" alt="BlockPropeller Logo"/>
                    <strong>BlockPropeller</strong>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/" exact>
                    <span>Servers</span>
                </Menu.Item>
                <Menu.Item as={NavLink} to="/providers">
                    <span>Providers</span>
                </Menu.Item>
                <div style={{
                    marginLeft: 'auto',
                    textAlign: 'right',
                    padding: '10px',
                }}>
                    <div><strong>{user.email}</strong></div>
                    <div style={{
                        color: '#4183c4',
                        marginTop: '2px',
                        cursor: 'pointer',
                    }} onClick={logoutUser}>Logout</div>
                </div>
            </Container>
        </Menu>;
    }
}

export default Header;
