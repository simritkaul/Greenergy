import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Dashboard.css";

const Dashboard = ({ contractAddress, contractAbi }) => {
    const solarRequest = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const GreenergyContract = new ethers.Contract(contractAddress, contractAbi, signer);

                // Executing the login
                let reqSolarTxn = await GreenergyContract.requestSolar();
                console.log("Mining...", reqSolarTxn.hash);
                await reqSolarTxn.wait();
                console.log("Mined: ", reqSolarTxn.hash);
            } else {
                console.log("Ethereum object doesn't exist");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const stopRequest = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const GreenergyContract = new ethers.Contract(contractAddress, contractAbi, signer);

                // Executing the login
                let reqStopTxn = await GreenergyContract.stopRequest();
                console.log("Mining...", reqStopTxn.hash);
                await reqStopTxn.wait();
                console.log("Mined: ", reqStopTxn.hash);
            } else {
                console.log("Ethereum object doesn't exist");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <div className='option-container'>
                <div className='option'>
                    <h2>Request Solar Energy</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                    <button className='btn optionbtn' onClick={solarRequest}>
                        Go
                    </button>
                </div>
                <div className='option'>
                    <h2>Payments</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                    <button className='btn optionbtn' onClick={() => {}}>
                        Go
                    </button>
                </div>
                <div className='option'>
                    <h2>Stop Subcription of Solar Energy</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, cum?</p>
                    <button className='btn optionbtn' onClick={stopRequest}>
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
