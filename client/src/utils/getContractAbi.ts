import axios from "axios";
var ethers = require("ethers");
const API_KEY = "3DHRNIKHQ1E5RS6C1DVECHPG9DX73U54Q1";

const getContractAbi = async (contract: string) => {
	return await axios.get(
		`https://api.etherscan.io/api?module=contract&action=getabi&address=${ethers.utils.getAddress(contract)}&apikey=${API_KEY}`
	);
};

export { getContractAbi };
