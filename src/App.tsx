import { Box } from '@material-ui/core';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch as SwitchRouter } from 'react-router-dom';
import './App.css';
import { Login } from './container/Login';
import { Votations } from './container/Votations';
import { AppContext, AppContextType } from './context/context-app';


function App() {

  const { isLoggedIn } = useContext<AppContextType>(AppContext)

  return (
    <Router>
      <Box className="App">
        {
          isLoggedIn ?
            <SwitchRouter>
              <Route path="/votations">
                <Votations />
              </Route>
            </SwitchRouter>
            :
            <Login />

        }
      </Box>
    </Router>
  );
}

export default App;
