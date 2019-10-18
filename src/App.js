import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Loader} from "semantic-ui-react";
import Cookies from 'js-cookie';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {UserContext} from "./Common/contexts";
import {UserService} from "./Services";

import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import ProvidersPage from "./Pages/ProvidersPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreateServerPage from "./Pages/CreateServerPage";
import CreateProviderPage from "./Pages/CreateProviderPage";
import ServerPage from "./Pages/ServerPage";
import ProviderPage from "./Pages/ProviderPage";

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
        let tokenCookie = Cookies.get('token');

        let user;

        if (tokenCookie) {
            UserService.setJwtToken(tokenCookie);

            user = await UserService.getUser();
        }

        this.setState({
            user,
            loaded: true,
            loggedIn: !!user,
        });
    }

    handleUserLogin = async ({email, password}) => {
        const userToken = await UserService.loginUser(email, password);

        if (userToken) {
            UserService.setJwtToken(userToken);

            const user = await UserService.getUser();

            this.setState({
                user,
                loggedIn: !!user,
            });
        }
    };

    handleUserLogout = () => {
        UserService.logoutUser();

        this.setState({
            user: null,
            loggedIn: false,
        });
    };

    handleUserRegister = async (data) => {};

    render() {
        const {loggedIn, loaded, user} = this.state;

        if (!loaded) {
            return <div className="App">
                <Loader active  size='large'>Loading Application</Loader>
            </div>;
        }

        if (!loggedIn) {
            return <Router>
                <div className="App">
                    <UserContext.Provider value={{
                        user,
                        loggedIn,
                        loginUser: this.handleUserLogin,
                        logoutUser: this.handleUserLogout,
                        registerUser: this.handleUserRegister,
                    }}>
                        <Switch>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/register" component={RegisterPage}/>
                            <Redirect to="/login"/>
                        </Switch>
                    </UserContext.Provider>
                </div>
            </Router>
        }

        return (
            <Router>
                <UserContext.Provider value={{
                    user,
                    loggedIn,
                    loginUser: this.handleUserLogin,
                    logoutUser: this.handleUserLogout,
                    registerUser: this.handleUserRegister,
                }}>
                    <div className="App">
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/server/create" exact component={CreateServerPage}/>
                            <Route path="/server/:id" exact component={ServerPage}/>
                            <Route path="/providers" component={ProvidersPage}/>
                            <Route path="/provider/create" exact component={CreateProviderPage}/>
                            <Route path="/provider/:id" component={ProviderPage}/>
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </UserContext.Provider>
            </Router>
        );
    }
}

export default App;
