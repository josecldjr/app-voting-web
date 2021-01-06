import { Box } from '@material-ui/core';
import React, { useContext } from 'react';
import { Route, Switch as SwitchRouter } from 'react-router-dom';
import './App.css';
import { Login } from './container/Login';
import { AppContext, AppContextData } from './context/context-app';


function App() {

  const { isLoggedIn } = useContext<AppContextData>(AppContext)

  return (
    <Box className="App">
      {
        isLoggedIn ?
          <SwitchRouter>
            <Route path="/votations">

            </Route>
          </SwitchRouter>
          :
          <Login />

      }
    </Box>
  );
}

export default App;
