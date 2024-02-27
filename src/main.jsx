import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import React from 'react';

// Components
import App from './App.jsx';
import Hangman from "./pages/Hangman.jsx";
import Leaderboards from "./pages/Leaderboards.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import AuthenticationPage from "./pages/AuthenticationPage.jsx";

import 'bootstrap/dist/css/bootstrap.css'; // this is the import for bootstrap css
import './index.css';

import store from "./reducers/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='game1' element={<Hangman/>} />
      <Route path='leaderboards' element={<Leaderboards/>} />
      <Route path='account' element={<AccountPage/>} />
      <Route path='authentication' element={<AuthenticationPage/>}>
        <Route path="login" element={<LoginPage/>} />
        <Route path="createAccount" element={<CreateAccountPage/>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
