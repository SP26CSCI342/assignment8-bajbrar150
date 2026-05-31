import { Routes, Route } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

// TODO: Import the Home page component
import HomePage from '../../pages/HomePage';
// TODO: Import the Login form component
import LoginForm from '../../forms/LoginForm';
// TODO: Import the Signup form component
import SignupForm from '../../forms/SignupForm';
// TODO: Import the PageNotFound component
import PageNotFound from '../../pages/PageNotFound';

import Profile from "../../pages/Profile";
import ProtectedRoute from "../ProtectedRoute";

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Navigation />
      <h1>PlateScout</h1>


      <Routes>
        {/* TODO: Add the route for the Home page */}
        <Route path="/" element={<HomePage />} />

        {/* TODO: Add the route for the Login page */}
        <Route path="/login" element={<LoginForm />} />

        {/* TODO: Add the route for the Signup page */}
        <Route path="/signup" element={<SignupForm />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

         {/* TODO: Add the fallback route for pages that do not exist */}
         <Route path="*" element={<PageNotFound />} />
         
      </Routes>
    </div>
  );
}