import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Dashboard from "../Dashboard/Dashboard";
import "./App.css";
// import abi from '../utils/Greenergy.json';

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");

    // const contractAddress = "0x7Cdb8710360eAe7b67197488F3F250c1c09B3DDe";
    // const contractABI = abi.abi;

    const walletConnectionCheck = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("Make sure you have metamask.");
                return;
            } else {
                console.log("We have the ethereum object.");
            }

            // Checking if we can access the user's wallet
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account: ", account);
                setCurrentAccount(account);
            } else {
                console.log("No authorized account found!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Get Metamask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected ", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        walletConnectionCheck();
    }, []);

    return (
        <div className='app-container'>
            <h1>App</h1>
            {/* If there is no currentAccount render this button */}
            {!currentAccount && (
                <button className='btn connbtn' onClick={connectWallet}>
                    Connect Wallet
                </button>
            )}
            {/* If there's a connected account */}
            {currentAccount && <Dashboard />}
        </div>
    );
};

export default App;
