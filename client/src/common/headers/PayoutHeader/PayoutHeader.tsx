import React, { useEffect, useState } from "react";
import { PayoutHeaderProps } from "../../../models/ui/headers";
import axios from "axios";

const PayoutHeader = ({ artist_eth, treasury_eth }: PayoutHeaderProps) => {
	const [currentUsdEth, setCurrentUsdEth] = useState<number>();
	useEffect(() => {
		const etherscanETHApi = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${"3DHRNIKHQ1E5RS6C1DVECHPG9DX73U54Q1"}`;
		axios
			.get(etherscanETHApi)
			.then(function (response) {
				setCurrentUsdEth(response?.data?.result?.ethusd);
			})
			.catch((err) => console.log(err));
	}, []);
	function numberWithCommas(x: any) {
		return `${x}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	return (
		<>
			{currentUsdEth && artist_eth && (
				<div className="ƒlex justify-end items-baseline text-neutral-300 uppercase font-thin text-right px-3 mt-auto py-3">
					<div className="text-neutral-300 mr-auto sm:text-lg">ARTIST PAYOUT</div>
					<span className="mr-1 text-green-500 sm:text-lg">{artist_eth}</span>
					<span className="mr-2 text-neutral-400 sm:text-lg">ETH</span>|
					<span className="ml-2 mr-1 text-green-500 sm:text-lg">
						{numberWithCommas((parseInt(artist_eth) * currentUsdEth).toFixed(0))}
					</span>
					<span className="mr-1 text-neutral-400 text-lg">USD</span>
				</div>
			)}
			{false && (
				<>
					<div className="sm:hidden flex flex-row justify-between items-baseline max-w-7xl sm:mx-auto bg-neutral-950 py-2 mx-3 border-b border-neutral-900">
						<div className="ƒlex items-center sm:hidden text-xs text-neutral-300 uppercase font-thin px-3">
							<span className="mr-2 text-xs sm:text-sm text-green-500">{treasury_eth}</span>
							<span className="mr-2 text-xs sm:text-sm text-green-500">ETH</span>
							Treasury
						</div>
						<div className="ƒlex items-center sm:hidden text-xs text-neutral-300 uppercase font-thin px-3">
							<span className="mr-2 text-xs sm:text-sm text-green-500">{artist_eth}</span>
							<span className="mr-2 text-xs sm:text-sm text-green-500">ETH</span>
							Artists
						</div>
					</div>
					<div className="flex flex-row items-center justify-between max-w-7xl xl:mx-auto bg-neutral-950 sm:py-2 mx-3">
						<div className="hidden sm:flex text-neutral-300 uppercase font-thin px-5 ">
							<div className="min-w-max max-w-xs tracking-wider">
								<span className="mr-2 text-green-500">{artist_eth}</span>
								<span className="mr-2 text-green-500">ETH</span>
							</div>
							Artists
						</div>
						<div className="hidden sm:flex text-neutral-300 uppercase font-thin px-5 ">
							<div className="min-w-max max-w-xs tracking-wider">
								<span className="mr-2  text-green-500">{treasury_eth}</span>
								<span className="mr-2  text-green-500">ETH</span>
							</div>
							Treasury
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default PayoutHeader;
