import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./Login.css";
import Dashboard from "../Dashboard/Dashboard";
import abi from "../../utils/Greenergy.json";

const Login = ({ currentAccount, setCurrentAccount, loggedIn, setLoggedIn }) => {
    const [inputId, setInputId] = useState(0);
    const [inputName, setInputName] = useState("");
    const [inputHouse, setInputHouse] = useState("");

    const contractAddress = "0x39E61602388E5d9DF46D8df07157068A3C2E3d60";
    const contractABI = abi.abi;

    const handleInput1 = (e) => {
        // Selecting the input element and get its value
        const inputVal = e.target.value;
        console.log(inputVal);
        setInputId(inputVal.toString());
    };

    const handleInput2 = (e) => {
        const inputVal = e.target.value;
        console.log(inputVal);
        setInputName(inputVal.toString());
    };

    const handleInput3 = (e) => {
        const inputVal = e.target.value;
        console.log(inputVal);
        setInputHouse(inputVal.toString());
    };

    const connectToMembership = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Get Metamask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected ", accounts[0]);

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const GreenergyContract = new ethers.Contract(contractAddress, contractABI, signer);

            let memberInfo = await GreenergyContract.Members(inputId - 1);
            if (!memberInfo || !memberInfo.active) {
                alert("Member with this Id does not exist");
                return;
            }

            if (memberInfo.name != inputName || memberInfo.house != inputHouse) {
                alert("Incorrect credentials");
                return;
            }

            // Executing the login
            let loggingTxn = await GreenergyContract.addMemberWallet(inputId);
            console.log("Mining...", loggingTxn.hash);
            await loggingTxn.wait();
            console.log("Mined: ", loggingTxn.hash);

            memberInfo = await GreenergyContract.Members(inputId - 1);
            console.log("From solidity Members List: ", memberInfo.acc);

            setCurrentAccount(accounts[0]);
            setLoggedIn(true);
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
            {loggedIn && (
                <Dashboard
                    currentAccount={currentAccount}
                    contractAddress={contractAddress}
                    contractABI={contractABI}
                />
            )}
        </div>
    );
};

export default Login;
