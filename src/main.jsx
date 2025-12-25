import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import NewSales from './Pages/NewSales/NewSales.jsx';

import { Provider } from 'react-redux'
import { store } from './Redux/Store.js';
import Auth from './Pages/Auth/Auth.jsx';
import ViewSales from './Pages/ViewSales/ViewSales.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import AdminSignin from './Pages/Admin/AdminSignin.jsx';
import AdminSignup from './Pages/Admin/AdminSignup.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/newSales" element={<NewSales />} />
      <Route path="/viewSales" element={<ViewSales/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/admin/signin" element={<AdminSignin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)