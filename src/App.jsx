import { Outlet } from 'react-router-dom';
import React from 'react';
import NavBarComponent from './NavBar.jsx';

function App() {

  return (
    <>
      <NavBarComponent/>
      <Outlet/>
    </>
  )
}

export default App
