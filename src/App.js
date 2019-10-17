import React from 'react';
import {Button, Container, Segment} from "semantic-ui-react";
import {BrowserRouter as Router} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Header from "./Components/Header/Header";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Container>
                    <Segment>
                        <Segment.Group>
                            <Segment color='teal'>Top</Segment>
                            <Segment color='teal'>Middle</Segment>
                            <Segment color='black'>Bottom</Segment>
                        </Segment.Group>
                        <Button primary>Click Here</Button>
                    </Segment>
                </Container>
            </div>
        </Router>
    );
}

export default App;
