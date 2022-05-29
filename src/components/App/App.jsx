import React from "react";
import { useState, useEffect } from "react";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import "./App.css";
import abi from "../../utils/Greenergy.json";

const App = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const contractAddress = "0xCa0fdD4de6a44344A0f260Bf8dBF8c75d83F4208";
    const contractABI = abi.abi;

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
                setLoggedIn(true);
            } else {
                console.log("No authorized account found!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        walletConnectionCheck();
    }, []);

    return (
        <div className='app-container'>
            <h1>Greenergy Residential Society</h1>
            {/* If there is no currentAccount render this button */}
            {/* {!currentAccount && (
                <button className='btn connbtn' onClick={connectWallet}>
                    Connect Wallet
                </button>
            )} */}

            {!currentAccount && (
                <Login
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                />
            )}

            {/* If there's a connected account */}
            {currentAccount && (
                <Dashboard
                    currentAccount={currentAccount}
                    contractAddress={contractAddress}
                    contractABI={contractABI}
                />
            )}
        </div>
    );
};

export default App;
