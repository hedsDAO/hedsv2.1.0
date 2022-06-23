// @ts-nocheck
import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { EnsAuthProps } from "../../../models/ui/EnsAuth";
import useMoralisHooks from "../../../hooks/useMoralis";

const EnsAuth = ({ setIsVerifying }: EnsAuthProps) => {
	const { ensResult, fetchEns, setEnsResult, updateEnsMoralis } = useMoralisHooks();

	useEffect(() => {
		setTimeout(() => {
			fetchEns();
		}, 2000);
	}, []);
	const handleUpdateEns = () => {
		updateEnsMoralis();
		setIsVerifying(false);
	};
	const handleExit = () => {
		setEnsResult(undefined);
		setIsVerifying(false);
	};
	return (
		<>
			{/* <div className="flex items-center">
				{!ensResult?.length ? (
					<ReactLoading className="w-8 h-8 mx-10" type={"bars"} color={"#eee"} height={"32"} width={"32"} />
				) : (
					<div className="bg-indigo-600 px-10 py-1 mr-1 rounded-sm">
						<span className="text-white my-auto">{ensResult}</span>
					</div>
				)}
				{ensResult && (
					<ModalButton
						text_color="text-neutral-100"
						text_hover_color="hover:text-white"
						bg_color="bg-green-500"
						bg_hover_color="hover:bg-green-600"
						onClick={() => handleUpdateEns()}>
						<i className="fa-solid fa-link px-4"></i>
					</ModalButton>
				)}
				<ModalButton
					text_color="text-neutral-100"
					text_hover_color="hover:text-white"
					bg_color="bg-red-500"
					bg_hover_color="hover:bg-red-600"
					onClick={() => handleExit()}>
					<i className="fa-solid fa-x px-4"></i>
				</ModalButton>
			</div> */}
		</>
	);
};

export default EnsAuth;
