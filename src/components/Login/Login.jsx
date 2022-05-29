import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./Login.css";
import Dashboard from "../Dashboard/Dashboard";
import abi from "../../utils/Greenergy.json";

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [inputId, setInputId] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputHouse, setInputHouse] = useState("");

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;

    const handleInput1 = (e) => {
        // Selecting the input element and get its value
        const inputVal = e.target.value;
        setInputId(inputVal.toString());
    };

    const handleInput2 = (e) => {
        // Selecting the input element and get its value
        const inputVal = e.target.value;
        setInputName(inputVal.toString());
    };

    const handleInput3 = (e) => {
        // Selecting the input element and get its value
        const inputVal = e.target.value;
        setInputHouse(inputVal.toString());
    };

    const connectToMembership = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const GreenergyContract = new ethers.Contract(contractAddress, contractABI, signer);

                // Executing the login
                let loggingTxn = await GreenergyContract.addMemberWallet(1);
                console.log("Mining...", loggingTxn.hash);
                await loggingTxn.wait();
                console.log("Mined: ", loggingTxn.hash);

                setLoggedIn(true);
            } else {
                console.log("Ethereum object doesn't exist");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='login-container'>
            {/* If not logged in */}
            {!loggedIn && (
                <div className='loginform'>
                    <h3>Enter Member ID</h3>
                    <input
                        type='text'
                        name='memberId'
                        placeholder='Member ID'
                        className='idinput'
                        value={inputId}
                        onChange={handleInput1}
                    />
                    <h3>Enter Member Name</h3>
                    <input
                        type='text'
                        name='membername'
                        placeholder='Member Name'
                        className='nameinput'
                        value={inputName}
                        onChange={handleInput2}
                    />
                    <h3>Enter Member Block and House Number (Block-HouseNo)</h3>
                    <input
                        type='text'
                        name='memberhouse'
                        placeholder='Member Address'
                        className='nameinput'
                        value={inputHouse}
                        onChange={handleInput3}
                    />
                    <button className='btn loginbtn' onClick={connectToMembership}>
                        Connect to the Membership
                    </button>
                </div>
            )}
            {/* When logged in */}
            {loggedIn && <Dashboard contractAddress={contractAddress} contractAbi={contractABI} />}
        </div>
    );
};

export default Login;
