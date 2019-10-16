import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
    return (
        <div className="App">
            <Menu>
                <Container>
                  <Menu.Item as='a'>
                    <span>Testiram</span>
                  </Menu.Item>
                  <Menu.Item as='a' active>
                    <span>Active</span>
                  </Menu.Item>
                </Container>
            </Menu>
          <Container>
            <Button primary>Click Here</Button>
          </Container>
        </div>
    );
}

export default App;
