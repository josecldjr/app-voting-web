import { Box, Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch as SwitchRouter } from 'react-router-dom';
import './App.css';
import { Login } from './container/Login';
import { UserAccessSolicitaions } from './container/UserAccessSolicitations';
import { Votations } from './container/Votations';
import { useIsLoggedIn } from './context/context-app';
import { SideMenu } from './layout/SideMenu';



function App() {

  const isLoggedIn = useIsLoggedIn()

  return (
    <Container>
      <Router>
        <Box className="App">
          {
            isLoggedIn ?
              <>
                <SideMenu />
                <SwitchRouter>
                  <Route path="/" exact> <Votations /> </Route>
                  <Route path="/votations" exact> <Votations /> </Route>
                  <Route path="/access-solicitations" exact> <UserAccessSolicitaions /></Route>
                  <Route path="*"> <h1>Página não encontrada</h1> </Route>
                </SwitchRouter>
              </>
              :
              <Login />

          }
        </Box>
      </Router>
    </Container>
  );
}

export default App;
