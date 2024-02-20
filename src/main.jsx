import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importing Components
import Wordle from "./pages/Wordle.jsx";
import Leaderboards from "./pages/Leaderboards.jsx";
import AccountPage from "./pages/AccountPage.jsx";

import 'bootstrap/dist/css/bootstrap.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/game1' element={<Wordle/>}/>
      <Route path='/leaderboards' element={<Leaderboards/>}/>
      <Route path='/account' element={<AccountPage/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
