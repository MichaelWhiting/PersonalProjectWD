import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Importing Components
import Wordle from "./pages/Hangman.jsx";
import Leaderboards from "./pages/Leaderboards.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";

import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import store from "./reducers/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/game1' element={<Wordle/>}/>
      <Route path='/leaderboards' element={<Leaderboards/>}/>
      <Route path='/account' element={<AccountPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path="/createAccount" element={<CreateAccountPage/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>    
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
