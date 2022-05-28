const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account Balance: ", accountBalance.toString());

    const GreenergyContractFactory = await hre.ethers.getContractFactory("Greenergy");
    const GreenergyContract = await GreenergyContractFactory.deploy({ value: hre.ethers.utils.parseEther("0.005") });
    await GreenergyContract.deployed();
    console.log("GreenergyContract deployed at: ", GreenergyContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
