import React from 'react';
import {NavLink} from "react-router-dom";
import {Container, Menu} from "semantic-ui-react";

const Header = () => {
    return (
        <Menu>
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
            </Container>
        </Menu>
    );
};

export default Header;
