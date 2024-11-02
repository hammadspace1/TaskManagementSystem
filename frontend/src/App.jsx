import React from 'react';
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Admin from './Components/Admin/Admin'
import Manager from './Components/Manager/Manager';
import User from './Components/User/User';
import Login from './Components/Login/Login';
import { GlobalStateProvider } from './Components/global/GlobalStateProvider';

function App() {

  return (
    <div>
      <GlobalStateProvider>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/admin' element={<Admin />}  />
        <Route path='/manager' element={<Manager />}  />
        <Route path='/user' element={<User />}  />
        <Route path='/' element={<Login />}  />
      </Routes>
      </BrowserRouter>
      </GlobalStateProvider>
    </div>
  )
}

export default App;
