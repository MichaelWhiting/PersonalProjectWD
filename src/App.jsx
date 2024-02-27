import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { React, useEffect } from 'react';
import axios from 'axios';

// Components
// import LoginPage from './pages/LoginPage.jsx';
import NavigationBar from './NavBar.jsx';
import AuthenticationPage from './pages/AuthenticationPage.jsx';

function App() {
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const sessionCheck = async () => {
    const res = await axios.get("/session-check");

    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId
      });
    }
  }

  useEffect(() => {
    sessionCheck();
  }, []);

  return (
    <>
      <NavigationBar/>
      { userId && 
        <Outlet/>
      } 
      { !userId && 
        <AuthenticationPage/>
      }
    </>
  )
}

export default App;
