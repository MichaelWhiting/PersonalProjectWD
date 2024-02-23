import { Outlet } from 'react-router-dom';
import React, { useId } from 'react';
import NavigationBar from './NavBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  
  const userId = useSelector((state) => state.userId);

  const sessionCheck = async () => {
    const res = await axios.get("/session-check")

    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId
      })
    }
  }
  
  useEffect(() => {
    sessionCheck();
  }, []);

  return (
    <>
      <NavigationBar/>
      { userId && 
        <>
          <Outlet/>
        </>
      }
      { !userId && 
        <>
          <LoginPage/>
        </>
      }
    </>
  )
}

export default App;
