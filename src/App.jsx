import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { React, useEffect } from 'react';
import axios from 'axios';

// Components
// import LoginPage from './pages/LoginPage.jsx';
import LoginLogoutPage from './pages/LoginCreatePage.jsx';
import NavigationBar from './NavBar.jsx';
import LoginCreatePage from './pages/LoginCreatePage.jsx';

function App() {
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  const sessionCheck = async () => {
    const res = await axios.get("/session-check")
    // console.log("This is the RES DATA:", res.data);
    // console.log(userId)
    if (res.data.success) { // THIS IS NOT GETTING HIT
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId
      })
    }
  }

  return (
    <>
      <NavigationBar/>
      { userId && 
          <Outlet/>
      }
      { !userId && 
          <LoginCreatePage/>
      }
    </>
  )
}

export default App;
