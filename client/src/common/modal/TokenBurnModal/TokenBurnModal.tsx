import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store";
import { useMoralis, useERC20Balances } from "react-moralis";
import LoadingIcon from "../../svg/LoadingIcon/LoadingIcon";
var ethers = require("ethers");
const GENHEAD_TOKEN_ADDRESS = "0x38da10d8a9fa9c98b27bc03a6f6999bb35d17375";
const GENHEAD_BURN_CONTRACT = "";
const GENHEAD_BURN_ABI = {};

enum TokenBurnSteps {
	AUTHENTICATE = 0,
	BURN,
	PENDING,
	COMPLETE,
}

const TokenBurnModal = () => {
	const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(false);
	const [step, setStep] = useState<TokenBurnSteps>(TokenBurnSteps.AUTHENTICATE);
	const [loading, setLoading] = useState<boolean>(false);
	const [genheadBalance, setGenheadBalance] = useState<string | void>();
	const [error, setError] = useState<string | void>();
	const { isWeb3Enabled, enableWeb3, isWeb3EnableLoading, web3 } = useMoralis();
	const { fetchERC20Balances, data } = useERC20Balances();
	const { locked, open } = useSelector((state: RootState) => state.globalModel.modal);
	const dispatch = useDispatch<Dispatch>();

	const handleTokenBurn = async () => {
		setLoading(true);
		setStep(TokenBurnSteps.COMPLETE);
		let contract;
		if (web3) {
			contract = new ethers.Contract(GENHEAD_BURN_CONTRACT, GENHEAD_BURN_ABI, web3.getSigner());
			try {
				const txn = await contract.redeem(genheadBalance);
				const receipt = await txn.wait();
				console.log(receipt, "txn reciept");
				setStep(TokenBurnSteps.COMPLETE);
			} catch (err: any) {
				setError("There was a problem claiming your status. Please try again.");
			}
		}
		setLoading(false);
	};
	const handleAuthAndBalance = async () => {
		setLoading(true);
		await enableWeb3()
			.then(async () => {
				await fetchERC20Balances()
					.then((res) => {
						if (res?.length) {
							res.map((token) => {
								console.log(token);
								if (token.token_address === GENHEAD_TOKEN_ADDRESS && token?.balance) {
									setGenheadBalance(token.balance);
								}
							});
						}
					})
					.catch(() => {
						setError("unable to authenticate your account, please try again.");
					});
			})
			.catch(() => setError("unable to authenticate"));
		setLoading(false);
	};

	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-[60]" onClose={locked ? () => {} : () => dispatch.globalModel.setModalVisibility(false)}>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex bg-neutral-950/90 min-h-full items-center justify-center text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-300"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg align-middle transition-all mt-5">
								<div className="relative z-50 inline-block align-bottom bg-neutral-950 border-[0.25px] border-neutral-700 rounded-lg py-8 px-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-md sm:w-full">
									<main className="max-w-lg mx-auto">
										<div className="flex flex-col justify-center items-center">
											<h5 className="mb-2 uppercase text-lg font-semibold text-gray-200 lg:text-xl">OG HED</h5>
											<p className="text-xs font-semibold text-gray-400 mb-4 uppercase">
												{"Artist & Collector Elevation"}
											</p>
										</div>
										{step === TokenBurnSteps.AUTHENTICATE ? (
											<Authenticate
												dispatch={dispatch}
												handleAuthAndBalance={handleAuthAndBalance}
												isWeb3Enabled={isWeb3Enabled}
												isWeb3EnableLoading={isWeb3EnableLoading}
												setStep={setStep}
											/>
										) : step === TokenBurnSteps.BURN ? (
											<Burn
												data={data}
												dispatch={dispatch}
												handleTokenBurn={handleTokenBurn}
												loading={loading}
												isWeb3Enabled={isWeb3Enabled}
												hasAcceptedTerms={hasAcceptedTerms}
												setHasAcceptedTerms={setHasAcceptedTerms}
											/>
										) : step === TokenBurnSteps.PENDING ? (
											<div className="flex flex-col justify-center items-center h-full py-20">
												<LoadingIcon />
												{error ? (
													<h4 className="text-xs text-center mt-3 mb-4 px-8 font-thin uppercase text-red-500">
														<i className="fa-thin fa-circle-exclamation text-red-500 mr-2"></i>
														{error}
													</h4>
												) : (
													<></>
												)}
											</div>
										) : (
											<Fragment>
												<div className="flex flex-col justify-center items-center">
													<p className="text-base font-semibold text-green-500 mb-2 mt-2 uppercase">
														STATUS CLAIMED
													</p>
												</div>
												<div className="gap-x-2 flex justify-center items-stretch pt-4">
													<button
														onClick={() => dispatch.globalModel.setModalVisibility(false)}
														disabled={hasAcceptedTerms}
														className="px-4 py-1 text-sm bg-green-900 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
														VIEW PROFILE
													</button>
												</div>
											</Fragment>
										)}
									</main>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default TokenBurnModal;

const Authenticate = ({ dispatch, handleAuthAndBalance, isWeb3Enabled, isWeb3EnableLoading, setStep }: any) => {
	return (
		<Fragment>
			<div className="text-center mx-auto">
				<div className="text-sm font-medium text-neutral-400 my-4 px-8 py-5 bg-neutral-900 mx-10 rounded-lg">
					The past year has been an eye-opening experience at heds. From day one, our goal has been supporting and rewarding
					creativity- that will never change.
					<br />
					<br />
					<span className="text-neutral-300 pt-4">
						We know you've been here since day one and, as always, it's our prerogative to reward the OG's.
					</span>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center mt-6">
				<p className="text-base font-semibold text-gray-400 mb-2 mt-2 uppercase">THE PERKS OF BEING AN OG</p>
			</div>
			<div className="grid grid-cols-4 items-center bg-neutral-900 p-4 rounded-lg max-w-[95%] mx-auto mt-2 mb-2">
				<div className="col-span-1 text-right pr-9">
					<i className="fa-solid fa-bolt text-green-500 text-3xl"></i>
				</div>
				<div className="flex flex-col items-start justify-center rounded-lg col-span-3">
					<h3 className="text-green-500 uppercase text-xs tracking-wide font-semibold">VOTING POWER</h3>
					<p className="text-xs text-neutral-400 tracking-wide">
						Voting power on the heds platform will be permanently increased by 10.
					</p>
				</div>
			</div>
			<div className="grid grid-cols-4 items-center bg-neutral-900 p-4 rounded-lg max-w-[95%] mx-auto mb-10">
				<div className="col-span-1 text-right pr-9">
					<i className="fa-solid fa-badge text-green-500 text-3xl"></i>
				</div>
				<div className="flex flex-col items-start justify-center rounded-lg col-span-3">
					<h3 className="text-green-500 uppercase text-xs tracking-wide font-semibold">CUSTOM BADGE</h3>
					<p className="text-xs text-neutral-400 tracking-wide">
						Unlock the rare <span className="font-bold">OG HED</span> badge. This badge will not be available after this
						redemption period.
					</p>
				</div>
			</div>
			<div className="gap-x-2 flex justify-center items-stretch pt-4">
				<button
					onClick={() => dispatch.globalModel.setModalVisibility(false)}
					className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-900 transition-all">
					CANCEL
				</button>
				<button
					onClick={isWeb3Enabled ? () => setStep(TokenBurnSteps.BURN) : () => handleAuthAndBalance()}
					disabled={isWeb3EnableLoading}
					className="px-4 py-1 text-sm bg-green-900 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
					{isWeb3Enabled ? "CONTINUE" : "AUTHENTICATE"}
				</button>
			</div>
		</Fragment>
	);
};

const Burn = ({ data, dispatch, handleTokenBurn, isWeb3Enabled, hasAcceptedTerms, setHasAcceptedTerms }: any) => {
	return (
		<Fragment>
			<div className="flex flex-col justify-center items-center">
				<p className="text-base font-semibold text-gray-400 mb-2 mt-2 uppercase">HOW TO CLAIM OG STATUS</p>
			</div>
			<div className="grid grid-cols-4 items-center bg-neutral-900 p-4 rounded-lg max-w-[95%] mx-auto mt-2 mb-2">
				<div className="col-span-1 text-right pr-9">
					<i className="fa-solid fa-circle-1 text-neutral-400 text-xl"></i>
				</div>
				<div className="flex flex-col items-start justify-center rounded-lg col-span-3">
					<h3 className="text-neutral-400 uppercase text-xs tracking-wide font-semibold">BURN GENHEAD TOKENS</h3>
					<p className="text-xs text-neutral-400 tracking-wide">
						After clicking burn, you will be prompted with a secure smart contract to burn your tokens.
					</p>
				</div>
			</div>
			<div className="grid grid-cols-4 items-center bg-neutral-900 p-4 rounded-lg max-w-[95%] mx-auto mb-2">
				<div className="col-span-1 text-right pr-9">
					<i className="fa-solid fa-circle-2 text-neutral-400 text-xl"></i>
				</div>
				<div className="flex flex-col items-start justify-center rounded-lg col-span-3">
					<h3 className="text-neutral-400 uppercase text-xs tracking-wide font-semibold">RECEIVE ETH</h3>
					<p className="text-xs text-neutral-400 tracking-wide">
						The initial amount of ETH traded will be returned to your wallet.
					</p>
				</div>
			</div>
			<div className="grid grid-cols-4 items-center bg-neutral-900 p-4 rounded-lg max-w-[95%] mx-auto mb-2">
				<div className="col-span-1 text-right pr-9">
					<i className="fa-solid fa-circle-3 text-neutral-400 text-xl"></i>
				</div>
				<div className="flex flex-col items-start justify-center rounded-lg col-span-3">
					<h3 className="text-neutral-400 uppercase text-xs tracking-wide font-semibold">PERKS</h3>
					<p className="text-xs text-neutral-400 tracking-wide">
						Voting power will automatically be allotted and the OG badge will appear shortly.
					</p>
				</div>
			</div>
			{data?.length &&
				isWeb3Enabled &&
				data.map((token: any) => {
					if (token.token_address === "0x38da10d8a9fa9c98b27bc03a6f6999bb35d17375")
						return (
							<div key={token.name} className="py-4">
								<div className="text-green-500 font-thin flex justify-center text-sm">
									<h6>
										GENHEAD BALANCE - {ethers.utils.formatUnits(token.balance, "ether")}{" "}
										<span className="ml-1">
											({parseInt(ethers.utils.formatUnits(token.balance, "ether")) / 1000} ETH)
										</span>
									</h6>
								</div>
							</div>
						);
				})}
			<div className="relative flex justify-center items-start">
				<div className="flex items-center h-5">
					<input
						id="comments"
						onChange={() => setHasAcceptedTerms(!hasAcceptedTerms)}
						aria-describedby="comments-description"
						name="comments"
						type="checkbox"
						className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
					/>
				</div>
				<div className="ml-3 text-sm">
					<span id="comments-description" className="text-neutral-500">
						I accept{" "}
						<a href="" target="_blank" className="text-blue-500">
							terms and conditions.
						</a>
					</span>
				</div>
			</div>
			<div className="gap-x-2 flex justify-center items-stretch pt-6">
				<button
					onClick={() => dispatch.globalModel.setModalVisibility(false)}
					className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-900 transition-all">
					CANCEL
				</button>
				<button
					onClick={() => handleTokenBurn()}
					disabled={!hasAcceptedTerms}
					className="px-4 py-1 text-sm bg-green-900 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
					BURN
				</button>
			</div>
		</Fragment>
	);
};
