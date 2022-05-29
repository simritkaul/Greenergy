import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Dashboard.css";

const Dashboard = ({ currentAccount, contractAddress, contractABI }) => {
    const [memberList, setMemberList] = useState([]);
    const [requestList, setRequestList] = useState([]);

    const getAllMembers = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const GreenergyContract = new ethers.Contract(contractAddress, contractABI, signer);

                const members = await GreenergyContract.getMembers();

                const membersCleaned = members.map((member) => {
                    return {
                        name: member.name,
                        house: member.house,
                        wallet: member.acc,
                        active: member.active,
                    };
                });

                /*
                 * Store our data in React State
                 */
                setMemberList(membersCleaned);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllRequests = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const GreenergyContract = new ethers.Contract(contractAddress, contractABI, signer);

                const requests = await GreenergyContract.getRequests();

                if (!requests) {
                    console.log("No request");
                    return;
                }

                // We only need address, timestamp, and message in our UI so let's pick those out
                const requestsCleaned = requests.map((request) => {
                    return {
                        rid: request.reqid.toNumber(),
                        mid: request.memid.toNumber(),
                        status: request.reqStatus,
                    };
                });

                /*
                 * Store our data in React State
                 */
                setRequestList(requestsCleaned);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const solarRequest = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const GreenergyContract = new ethers.Contract(contractAddress, contractABI, signer);

                // Executing the login
                let reqSolarTxn = await GreenergyContract.requestSolar();
                console.log("Mining...", reqSolarTxn.hash);
                await reqSolarTxn.wait();
                console.log("Mined: ", reqSolarTxn.hash);
                await getAllRequests();
            } else {
                console.log("Ethereum object doesn't exist");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const payMoney = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const GreenergyContract = new ethers.Contract(contractAddress, contractABI, signer);

                console.log((await signer.getBalance()).toString());
                let contractBal = (await provider.getBalance(GreenergyContract.address)).toString();
                console.log("Contract Balance: ", parseInt(contractBal) / 1000000000000000000);

                // Executing the login
                let paymentTxn = await GreenergyContract.payment({ value: ethers.utils.parseEther("0.005") });
                console.log("Mining...", paymentTxn.hash);
                await paymentTxn.wait();
                console.log("Mined: ", paymentTxn.hash);

                console.log((await signer.getBalance()).toString());

                contractBal = (await provider.getBalance(GreenergyContract.address)).toString();
                console.log("Contract Balance: ", parseInt(contractBal) / 1000000000000000000);
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
                const GreenergyContract = new ethers.Contract(contractAddress, contractABI, signer);

                // Executing the login
                let reqStopTxn = await GreenergyContract.stopRequest();
                console.log("Mining...", reqStopTxn.hash);
                await reqStopTxn.wait();
                console.log("Mined: ", reqStopTxn.hash);
                await getAllRequests();
            } else {
                console.log("Ethereum object doesn't exist");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllMembers();
        getAllRequests();
    }, [memberList, requestList]);

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
                    <button className='btn optionbtn' onClick={payMoney}>
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

            <div className='info-container'>
                <div className='memberlist'>
                    <h2>These are members</h2>
                    {memberList.map((member, index) => {
                        return (
                            <div key={index} className='memberInfo'>
                                <p className='name'>{member.name}</p>
                                <p className='house'>{member.house}</p>
                                <p className='wallet'>{member.wallet}</p>
                                <p className='activemem'>{member.active ? `Active` : `Not a current member`}</p>
                            </div>
                        );
                    })}
                </div>
                <div className='reqlist'>
                    <h2>These are requests</h2>
                    {requestList.map((request, index) => {
                        return (
                            <div key={index + 100} className='requestInfo'>
                                <p className='reqid'>{request.rid}</p>
                                <p className='memberid'>{request.mid}</p>
                                <p className='status'>{request.status ? `Ongoing` : `Cancelled`}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
