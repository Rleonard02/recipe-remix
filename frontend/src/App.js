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
        {<Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pantry" element={<Pantry></Pantry>} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:postId" element={<Community />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/profile/:userId" element={<Profile /> } />

          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:conversationId" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/shoppingList" element={<ShoppingList />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
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
