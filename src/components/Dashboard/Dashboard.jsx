import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Dashboard.css";
// import abi from '../utils/Greenergy.json';

const Dashboard = () => {
    const [requestSolar, setRequestSolar] = useState(false);
    const [requestStop, setRequestStop] = useState(false);
    const [payments, setPayments] = useState(false);
    // const contractAddress = "0x7Cdb8710360eAe7b67197488F3F250c1c09B3DDe";
    // const contractABI = abi.abi;

    const chooseOption = (x) => {
        if (x === 0) {
            setRequestSolar(true);
            setPayments(false);
            setRequestStop(false);
        } else if (x === 1) {
            setPayments(true);
            setRequestSolar(false);
            setRequestStop(false);
        } else if (x === 2) {
            setRequestStop(true);
            setRequestSolar(false);
            setPayments(false);
        }
    };

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            {/* If no option is chosen */}
            {!requestSolar && !requestStop && !payments && (
                <div className='option-container'>
                    <div className='option'>
                        <h2>Request Solar Energy</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                        <button className='btn optionbtn' onClick={chooseOption(0)}>
                            Go
                        </button>
                    </div>
                    <div className='option'>
                        <h2>Payments</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                        <button className='btn optionbtn' onClick={chooseOption(1)}>
                            Go
                        </button>
                    </div>
                    <div className='option'>
                        <h2>Stop Subcription of Solar Energy</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                        <button className='btn optionbtn' onClick={chooseOption(2)}>
                            Go
                        </button>
                    </div>
                </div>
            )}
            {requestSolar && (
                <div className='req-solar-container'>
                    <h2>Request a connection</h2>
                    <div className='tipform'>
                        <textarea
                            type='text'
                            name='message'
                            placeholder='Type the tip'
                            className='tipinput'
                            // value={inputTip}
                            // onChange={handleInput}
                        />
                        <button className='btn tipbtn' onClick={() => {}}>
                            Send Request
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
