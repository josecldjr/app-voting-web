import { Box } from '@material-ui/core';
import React, { useContext } from 'react';
import './App.css';
import { Home } from './container/Home';
import { Login } from './container/Login';
import { AppContext, AppContextData } from './context/context-app';

function App() {

  const { isLoggedIn } = useContext<AppContextData>(AppContext)

  return (
    <Box className="App">
      {
        isLoggedIn ?
          <Home /> :
          <Login />

      }
    </Box>
  );
}

export default App;
