import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Container, Menu} from "semantic-ui-react";
import {UserContext} from "../../Common/contexts";

class Header extends Component {
    static contextType = UserContext;

    render() {
        const {user, logoutUser} = this.context;

        return <Menu>
            <Container>
                <Menu.Item>
                    <span>Logo</span>
                </Menu.Item>
                <NavLink to="/">
                    <Menu.Item>
                        <span>Servers</span>
                    </Menu.Item>
                </NavLink>
                <NavLink to="/providers">
                    <Menu.Item>
                        <span>Providers</span>
                    </Menu.Item>
                </NavLink>
                <div>
                    <div>{user.email}</div>
                    <div onClick={logoutUser}>Logout</div>
                </div>
            </Container>
        </Menu>;
    }
}

export default Header;
