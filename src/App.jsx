import { Outlet } from 'react-router-dom';
import React from 'react';
import NavigationBar from './NavBar.jsx';

function App() {

  return (
    <>
      <NavigationBar/>
      <Outlet/>
    </>
  )
}

export default App;
