import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import Navbar from "./Components/Navbar.jsx";
import ThemeToggleButton from "./Components/ThemeToggleButton.jsx";
import Orchids from "./Pages/Orchids.jsx";
import Details from "./Pages/Details.jsx";     
import Natural from "./Pages/Natural.jsx"; 
import Contact from "./Pages/Contact.jsx";
import Admin from "./Pages/Admin.jsx";
import Login from "./Pages/login.jsx";

const ProtectedRoute = ({ children }) => {
    
    const user = useSelector((state) => state.auth.user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default function App() {
  return (
    <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <ThemeToggleButton />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Orchids />} />
            <Route path="/detail/:id" element={<Details />} />
            <Route path="/natural" element={<Natural />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}