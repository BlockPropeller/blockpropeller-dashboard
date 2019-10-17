import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Loader} from "semantic-ui-react";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import UserService from "./Services/User.service";

import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import ProvidersPage from "./Pages/ProvidersPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            user: null,
            loaded: false,
        }
    }

    async componentDidMount() {
        const user = await UserService.getUser();

        this.setState({
            loaded: true,
            user,
            loggedIn: !!user,
        });
    }

    render() {
        const {loggedIn, loaded} = this.state;

        if (!loaded) {
            return <div className="App">
                <Loader active  size='large'>Loading Application</Loader>
            </div>;
        }

        if (!loggedIn) {
            return <Router>
                <div className="App">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <Redirect to="/login"/>
                    </Switch>
                </div>
            </Router>
        }

        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route path="/" component={HomePage}/>
                        <Route path="/providers" component={ProvidersPage}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
