import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Dashboard.css";
// import abi from '../utils/Greenergy.json';

const Dashboard = () => {
    // const contractAddress = "0x7Cdb8710360eAe7b67197488F3F250c1c09B3DDe";
    // const contractABI = abi.abi;


    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <div className='option-container'>
                <div className='option'>
                    <h2>Request Solar Energy</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                    <button className='btn optionbtn' onClick={()=>{}}>
                        Go
                    </button>
                    </div>
                    <div className='option'>
                        <h2>Payments</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                        <button className='btn optionbtn' onClick={()=>{}}>
                            Go
                        </button>
                    </div>
                    <div className='option'>
                        <h2>Stop Subcription of Solar Energy</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                        <button className='btn optionbtn' onClick={()=>{}}>
                            Go
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default Dashboard;
