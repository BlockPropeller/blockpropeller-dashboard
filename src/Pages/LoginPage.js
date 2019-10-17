import React, {Component} from 'react';

import {UserContext} from "../Common/contexts";

class LoginPage extends Component {
    static contextType = UserContext;

    render() {
        return (
            <div>
               login page
            </div>
        );
    }
}

export default LoginPage;
