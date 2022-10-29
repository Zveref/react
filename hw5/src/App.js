import React, { useState, useEffect } from 'react';
import Main from './Main.js'
import Profile from "./Profile"
import LandingPage from './LandingPage.js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';

export default function App(){
    const [user, setUser] = useState();
    // useEffect(() => {
    //     if(localStorage.getItem("active_user_name") == null) localStorage.setItem("active_user_name", online)
    // }, [online])

    //use this to stay logged in
    return(
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" index element={<LandingPage setUser={setUser}/>} />
                <Route path = "/main" element={user ? <Main setUser={setUser} username={user} /> :  <Navigate replace to="/" /> } />
                <Route path = "/profile" element={user ? <Profile setUser={setUser} username={user} /> :  <Navigate replace to="/" /> } /> */}

                <Route path="/" element={<LandingPage setUser={setUser}/>} />
                <Route path = "/main" element={localStorage.getItem("active_user_name") || user ? <Main username={localStorage.getItem("active_user_name")} /> : <Navigate replace to="/" />} />
                <Route path = "/profile" element={localStorage.getItem("active_user_name") || user ? <Profile username={localStorage.getItem("active_user_name")} /> : <Navigate replace to="/" /> } />
            </Routes>
      </BrowserRouter>
    )
}