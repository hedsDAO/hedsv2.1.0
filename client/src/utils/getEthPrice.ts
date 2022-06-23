import axios from "axios";

const getEthPrice = (): number => {
	const etherscanETHApi = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${"3DHRNIKHQ1E5RS6C1DVECHPG9DX73U54Q1"}`;
	axios
		.get(etherscanETHApi)
		.then(function (response) {
			return response?.data?.result?.ethusd;
		})
		.catch((err) => console.log(err));

	return 0;
};

export { getEthPrice };
