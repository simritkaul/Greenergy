import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../Dashboard/Dashboard";
import "./App.css";

const App = () => {
    return (
        <div className='app-container'>
            <h1>App</h1>
            <Dashboard />
        </div>
    );
};

export default App;
