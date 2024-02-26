import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { React, useEffect } from 'react';
import axios from 'axios';


function HomePage() {

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
      
      useEffect(() => {
        sessionCheck();
      }, [userId]);

    return (
        <>
        </>

    )
}

export default HomePage;