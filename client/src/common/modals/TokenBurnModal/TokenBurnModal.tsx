import React, { useState } from "react";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import { useMoralis, useERC20Balances } from "react-moralis";
import ReactLoading from "react-loading";
import CustomButton from "../../buttons/CustomButton/CustomButton";
import { TokenBurnModalProps } from "../../../models/common";
var ethers = require("ethers");
const GENHEAD_BURN_CONTRACT = "";
const hedstape_data = require("../../../data/hedsTAPE03.json");
const GENHEAD_BURN_ABI = hedstape_data.abi;

const TokenBurnModal = ({ isShowingTokenBurnModal, setIsShowingTokenBurnModal }: TokenBurnModalProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasProvider, setHasProvider] = useState<boolean>(false);
	const [hasClaimed, setHasClaimed] = useState<boolean>(false);
	const [genheadBalance, setGenheadBalance] = useState<string>();
	const [error, setError] = useState<string | null>(null);
	const { web3, enableWeb3, setUserData } = useMoralis();
	const { fetchERC20Balances, data } = useERC20Balances();
	const ghostLoader = (callback: Function) => {
		if (callback) {
			setIsLoading(true);
			setTimeout(() => {
				callback();
				setIsLoading(false);
			}, 3000);
		}
	};
	const claimStatus = async () => {
		// SMART CONTRACT LOGIC
		setIsLoading(true);
		let contract;
		if (web3) {
			contract = new ethers.Contract(GENHEAD_BURN_CONTRACT, GENHEAD_BURN_ABI, web3.getSigner());
			try {
				const txn = await contract.redeem(genheadBalance);
				const receipt = await txn.wait();
				console.log(receipt, "txn reciept");
				setHasClaimed(true);
				let updateBadges = { badges: ["OG HEAD"] };
				// @ts-ignore
				setUserData(updateBadges);
			} catch (err: any) {
				setError("There was a problem claiming your status. Please try again.");
			}
		}
		setIsLoading(false);
	};
	const authAndFetchBalance = async () => {
		await enableWeb3()
			.then(() => setHasProvider(true))
			.catch(() => setError("unable to authenticate"));
		await fetchERC20Balances()
			.then((res) => {
				if (res?.length) {
					res.map((token) => {
						console.log(token);
						if (token.token_address === "0x38da10d8a9fa9c98b27bc03a6f6999bb35d17375") {
							setGenheadBalance(token.balance);
						}
					});
				}
			})
			.catch(() => {
				setError("unable to authenticate your account, please try again.");
			});
	};
	return (
		<>
			<ModalWrapper isShowingModal={isShowingTokenBurnModal} setIsShowingModal={setIsShowingTokenBurnModal}>
				<div
					className={`relative inline-block align-bottom 
				 		  bg-neutral-900 rounded-sm py-6 text-left 
							overflow-hidden shadow-xl transform transition-all 
							sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}>
					<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-700">
						<i className="fa-thin fa-users-line text-neutral-200 my-auto"></i>
					</div>
					<h3 className="mt-4 mb-6 text-2xl text-center leading-6 text-neutral-400 font-extralight uppercase">CLAIM OG STATUS</h3>
					{error ? (
						<h4 className="text-xs text-center mt-3 mb-4 px-8 font-thin uppercase text-red-500">
							<i className="fa-thin fa-circle-exclamation text-red-500 mr-2"></i>
							{error}
						</h4>
					) : hasClaimed ? (
						<h4 className="text-xs text-center mt-3 mb-4 px-20 font-thin uppercase text-green-500">
							<i className="fa-thin fa-circle-check text-green-500 mr-2"></i>
							OG STATUS CLAIMED
						</h4>
					) : (
						<>
							{!hasProvider && (
								<div className="mt-5 mb-10 font-thin text-neutral-400 px-10">
									<div className="mx-5 mb-3 text-center bg-neutral-800 rounded-md px-4 py-3 uppercase text-sm">
										<h3 className="mt-1 mb-3 text-center bg-neutral-700 rounded-md px-4 py-3 uppercase text-">
											<div className="text-sm text-neutral-300 uppercase">
												you are seeing this message because you've{" "}
												<span className="text-green-500">contributed to our crowdfund</span>.
											</div>
										</h3>
										Those on the crowdfund list can acquire the status of{" "}
										<span className="font-thin text-amber-500 uppercase">OG hed</span>.
									</div>
									<div className="mx-5 bg-neutral-800 rounded-md px-4 py-3 uppercase text-sm">
										<h3 className="mt-1 mb-2 text-center bg-neutral-700 rounded-md px-4 py-3 uppercase text-">
											<div className="text-sm text-neutral-300 uppercase">
												With this status, you will be allotted the following perks:
											</div>
										</h3>
										<div className="flex justify-center flex-col">
											<h4 className="bg-neutral-900 text-neutral-500 px-3 py-2 rounded-md my-1 text-xs">
												1. your voting power on submissions will{" "}
												<span className="text-amber-500">always be increased by 10</span>
											</h4>
											<h4 className="bg-neutral-900 text-neutral-500 px-3 py-2 rounded-md my-1 text-xs">
												2. your address will be whitelisted as the{" "}
												<span className="text-amber-500"> earliest to mint on future hedsTAPE releases</span>
											</h4>
											<h4 className="bg-neutral-900 text-neutral-500 px-3 py-2 rounded-md my-1 text-xs">
												3. This status comes with a{" "}
												<span className="text-amber-500"> unique badge and profile picture on the site.</span>
											</h4>
										</div>
									</div>
									<div className="px-10 text-center">
										<small className="text-neutral-500 text-thin tracking-tighter leading-3">
											*Other privileges and rewards will be announced at a later date
										</small>
									</div>
								</div>
							)}
							{hasProvider && (
								<div className="mt-5 mb-10 font-thin text-neutral-400 px-10">
									<div className="mx-5 bg-neutral-800 rounded-md px-4 py-3 uppercase text-sm">
										<h3 className="mt-1 mb-2 text-center bg-neutral-700 rounded-md px-4 py-3 uppercase text-">
											<div className="text-sm text-neutral-300 uppercase">HOW TO CLAIM OG STATUS</div>
										</h3>
										<div className="flex justify-center flex-col">
											<h4 className="bg-neutral-900 text-neutral-400 px-3 py-2 rounded-md my-1 text-xs">
												1. burn and convert your genhead tokens
											</h4>
											<h4 className="bg-neutral-900 text-neutral-400 px-3 py-2 rounded-md my-1 text-xs">
												2. you will receive back the equivalent amount of contributed ETH
											</h4>
											<h4 className="bg-neutral-900 text-neutral-400 px-3 py-2 rounded-md my-1 text-xs">
												3. Your account will be listed as an OG. Unique profile items will be added soon.
											</h4>
										</div>
									</div>
								</div>
							)}
							<div>
								{!hasProvider && (
									<div className="flex justify-center mt-4 px-8">
										<CustomButton onClick={() => ghostLoader(authAndFetchBalance)} color={"green"} className={"group"}>
											{isLoading ? (
												<ReactLoading
													className="w-8 h-8 mx-10"
													type={"bars"}
													color={"#089F6E"}
													height={"32"}
													width={"32"}
												/>
											) : (
												<>
													Authenticate
													<i className="fa-thin fa-arrow-right ml-2 pt-0.5 group-hover:ml-4 transition-all"></i>
												</>
											)}
										</CustomButton>
									</div>
								)}
								{data?.length &&
									hasProvider &&
									data.map((token) => {
										if (token.token_address === "0x38da10d8a9fa9c98b27bc03a6f6999bb35d17375")
											return (
												<div key={token.name}>
													<div className="text-neutral-400 font-thin flex justify-center text-sm">
														<h6>
															GENHEAD BALANCE - {ethers.utils.formatUnits(token.balance, "ether")}{" "}
															<span className="ml-1">
																({parseInt(ethers.utils.formatUnits(token.balance, "ether")) / 1000} ETH)
															</span>
														</h6>
													</div>
													<div className="flex justify-center mt-4 px-8">
														<CustomButton
															onClick={() => ghostLoader(claimStatus)}
															color={"green"}
															className={"group"}>
															{isLoading ? (
																<ReactLoading
																	className="w-8 h-8 mx-10"
																	type={"bars"}
																	color={"#089F6E"}
																	height={"32"}
																	width={"32"}
																/>
															) : (
																<>CLAIM OG STATUS</>
															)}
														</CustomButton>
													</div>
												</div>
											);
									})}
							</div>
						</>
					)}
				</div>
			</ModalWrapper>
		</>
	);
};
export default TokenBurnModal;
