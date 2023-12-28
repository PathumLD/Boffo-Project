import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/students/AddStudent';
import UpdateStudent from './pages/students/UpdateStudent';

export default function App() {
  return (
    <>
      <BrowserRouter>

      <Header />

        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/about' element = {<About />} />
          <Route path='/sign-in' element = {<SignIn />} />
          <Route path='/sign-up' element = {<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/dashboard' element = {<Dashboard />} />
          <Route path='/addStudent' element = {<AddStudent />} />
          <Route path='/updateStudent/:id' element = {<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
