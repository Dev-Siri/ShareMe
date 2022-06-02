import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './components';
import Home from './container/Home';
import { gapi } from 'gapi-script';
import { fetchUser } from './utils/data';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if(!user) navigate('/login');
  }, [])

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  })


  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

export default App;