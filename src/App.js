import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import ProvidersPage from "./Pages/ProvidersPage";

function App() {
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

export default App;
