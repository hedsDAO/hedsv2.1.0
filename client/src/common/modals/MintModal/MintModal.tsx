// @ts-nocheck
import React, { useEffect, useState } from "react";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import { useMoralis } from "react-moralis";
import ReactLoading from "react-loading";
import CustomButton from "../../buttons/CustomButton/CustomButton";
import { MintModalProps } from "../../../models/common";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
var ethers = require("ethers");
// TODO: update ABI imports.
const hedstape_3_data = require("../../../data/hedsTAPE03.json");
const HEDSTAPE_3_ABI = hedstape_3_data.abi;
const hedstape_4_data = require("../../../data/hedsTAPE04.json");
const HEDSTAPE_4_ABI = hedstape_4_data.abi;

const MintModal = ({ isShowingMintModal, setIsShowingMintModal, tapeNum }: MintModalProps) => {
	const dispatch = useDispatch<Dispatch>();
	const globalTapeData = useSelector((state: RootState) => state.globalTapesModel);
	const tapeData = globalTapeData.hedstapes?.[parseInt(tapeNum) - 1];
	const [tapeQuantity, setTapeQuantity] = useState(null) as any;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMinted, setHasMinted] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const { web3, enableWeb3 } = useMoralis();

	useEffect(() => {
		dispatch.globalTapesModel.getGlobalTapesData();
	}, []);

	const mintHead = async () => {
		setIsLoading(true);
		let contract;
		if (web3) {
			if (tapeNum === "3") {
				contract = new ethers.Contract(tapeData?.contract, HEDSTAPE_3_ABI, web3.getSigner());
			}
			if (tapeNum === "4") {
				contract = new ethers.Contract(tapeData?.contract, HEDSTAPE_4_ABI, web3.getSigner());
			}
			try {
				const txn = await contract.mintHead(parseInt(tapeQuantity), {
					value: `${tapeQuantity}00000000000000000`,
				});
				setHasMinted(true);
				const receipt = await txn.wait();
				console.log(receipt);
			} catch (err: any) {
				console.log(err);
				if (err?.message?.includes("insufficient funds")) {
					setError("Insufficient funds for minting. Please try again.");
				} else setError("There was a problem minting your tapes. Please try again.");
			}
		}
		setIsLoading(false);
	};
	const ghostLoader = (callback: Function) => {
		if (callback) {
			setIsLoading(true);
			setTimeout(() => {
				callback();
				setIsLoading(false);
			}, 3000);
		}
	};

	return (
		<ModalWrapper isShowingModal={isShowingMintModal} setIsShowingModal={setIsShowingMintModal}>
			<div
				className={`relative inline-block align-bottom 
				 		  bg-neutral-900 rounded-sm py-6 text-left 
							overflow-hidden shadow-xl transform transition-all 
							sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6`}>
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-700">
					<i className="fa-thin fa-cassette-tape text-neutral-200 my-auto"></i>
				</div>
				<h3 className="mt-3 mb-6 text-2xl text-center leading-6 text-neutral-400 font-extralight uppercase">MINT</h3>
				{!web3 && !hasMinted && (
					<div className="flex justify-center mt-4 px-8">
						<CustomButton onClick={() => ghostLoader(enableWeb3)} color={"green"} className={"group"}>
							{isLoading ? (
								<ReactLoading className="w-8 h-8 mx-10" type={"bars"} color={"#089F6E"} height={"32"} width={"32"} />
							) : (
								<>
									Authenticate<i className="fa-thin fa-arrow-right ml-2 pt-0.5 group-hover:ml-4 transition-all"></i>
								</>
							)}
						</CustomButton>
					</div>
				)}
				{web3 && !hasMinted && (
					<div className="flex justify-center mt-4 mb-5 px-8">
						<div>
							<img
								className="h-32 w-32 relative border-4 border-neutral-900 shadow-md sm:h-44 sm:w-44 duration-300 hover:duration-300 ease-in-out"
								src={tapeData?.image}
							/>
						</div>
						<CustomButton onClick={() => setTapeQuantity("1")} color={"neutral"} className={"group mx-0.5"}>
							1
						</CustomButton>
						<CustomButton onClick={() => setTapeQuantity("3")} color={"neutral"} className={"group mx-0.5"}>
							3
						</CustomButton>
						{/* EXTRA QUANTITIES FOR TAPE 3 */}
						{tapeNum === "3" && (
							<>
								<CustomButton onClick={() => setTapeQuantity("5")} color={"neutral"} className={"group mx-0.5"}>
									5
								</CustomButton>
								<CustomButton onClick={() => setTapeQuantity("10")} color={"neutral"} className={"group mx-0.5"}>
									10
								</CustomButton>
							</>
						)}
					</div>
				)}
				{tapeQuantity && !hasMinted && (
					<>
						{error && (
							<h4 className="text-xs text-center mt-3 mb-4 px-8 font-thin uppercase text-red-500">
								<i className="fa-thin fa-circle-exclamation text-red-500 mr-2"></i>
								{error}
							</h4>
						)}
						<div className="flex justify-center mt-4">
							<CustomButton disabled={true} color={"neutral"} className={"group px-4 mx-0.5"}>
								{(parseInt(tapeQuantity) * 0.1).toFixed(2)} ETH
							</CustomButton>
							<CustomButton
								disabled={!web3 || !tapeQuantity}
								onClick={() => mintHead()}
								color={"green"}
								className={"group px-8 mx-0.5"}>
								{isLoading ? (
									<ReactLoading className="w-8 h-8 mx-10" type={"bars"} color={"#eee"} height={"32"} width={"32"} />
								) : (
									"Mint"
								)}
							</CustomButton>
						</div>
					</>
				)}
				{hasMinted && (
					<div className="flex items-center flex-col justify-center mt-4 mb-5 px-8">
						<h3 className="mt-3 mb-6 text-lg text-green-500 text-center leading-6 font-extralight uppercase">
							<i className="fa-thin fa-circle-check mr-2" />
							SUCCESS
						</h3>
						<div>
							<img
								className="h-32 w-32 relative border-4 border-neutral-900 shadow-md sm:h-44 sm:w-44 duration-300 hover:duration-300 ease-in-out"
								src={tapeData?.image}
							/>
						</div>
						<div className="flex justify-center mt-4">
							<CustomButton onClick={() => setIsShowingMintModal(false)} color={"neutral"} className={"group px-3 mx-0.5"}>
								BACK
							</CustomButton>
							{tapeData?.links?.opensea?.length && (
								<CustomButton
									onClick={() => window.open(tapeData.links.opensea)}
									color={"blue"}
									className={"group px-3 mx-0.5"}>
									<i className="fak fa-opensea mr-2"></i>VIEW ON OPENSEA
								</CustomButton>
							)}
						</div>
					</div>
				)}
			</div>
		</ModalWrapper>
	);
};
export default MintModal;
