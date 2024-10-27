import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import "./app.css";
import { useSelector } from "react-redux";

// Import pages and components
import Home from "./pages/Home/Home";
import Pantry from "./pages/Pantry/Pantry";
import Recipes from "./pages/Recipes/Recipes";
import Community from "./pages/Community/Community";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Preferences from "./pages/Preferences/Preferences";
import ShoppingList from './pages/ShoppingList/ShoppingList'; 
import Settings from "./pages/Settings/Settings";
import Messages from "./pages/Messages/Messages";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./components/ForgotPassword/ResetPasswordPage";
import EmailConfirmation from "./pages/Register/EmailConfirmation";
import Help from "./pages/Help/Help";
import SendCode from "./pages/SendCode/SendCode";


import Landing from "./pages/Landing/Landing";


function App() {
  const isLoggedIn = Boolean(useSelector((state) => state.token));
  
  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Landing />} />
          <Route path="/pantry" element={isLoggedIn ? <Pantry /> : <Navigate to="/" />} />
          <Route path="/recipes" element={isLoggedIn ? <Recipes /> : <Navigate to="/" />} />
          <Route path="/community" element={isLoggedIn ? <Community /> : <Navigate to="/" />} />
          <Route path="/community/:postId" element={isLoggedIn ? <Community /> : <Navigate to="/" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />

          <Route path="/profile/:userId" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />

          <Route path="/messages" element={isLoggedIn ? <Messages /> : <Navigate to="/" />} />
          <Route path="/messages/:conversationId" element={isLoggedIn ? <Messages /> : <Navigate to="/" />} />
          <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/" />} />
          <Route path="/preferences" element={isLoggedIn ? <Preferences /> : <Navigate to="/" />} />
          <Route path="/shoppingList" element={isLoggedIn ? <ShoppingList /> : <Navigate to="/" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
          <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/" /> : <ForgotPassword />} />
          <Route path="/resetPassword/:token" element={isLoggedIn ? <Navigate to="/" /> : <ResetPasswordPage />} />
          <Route path="/confirm-email/:token" element={isLoggedIn ? <Navigate to="/" /> : <EmailConfirmation />} />
          <Route path="/help" element={isLoggedIn ? <Help /> : <Navigate to="/" />} />
          <Route path="/sendcode" element={<SendCode />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
