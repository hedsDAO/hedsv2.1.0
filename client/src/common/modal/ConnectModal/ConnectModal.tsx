import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import ModalWrapper from "../../wrapper/ModalWrapper/ModalWrapper";
import MetamaskIcon from "../../svg/MetamaskIcon/MetamaskIcon";
import WalletConnectIcon from "../../svg/WalletConnectIcon/WalletConnectIcon";

export interface ConnectModalProps {
	isShowingConnectModal: boolean;
	setIsShowingConnectModal: Function;
}

const ConnectModal = ({ isShowingConnectModal, setIsShowingConnectModal }: ConnectModalProps) => {
	const { authenticate, isAuthenticated, isAuthenticating } = useMoralis();
	const handleAuthenticate = async (provider: object | void) => {
		if (isAuthenticated) setIsShowingConnectModal(false);
		else if (provider) authenticate({ provider: "walletconnect", chainId: 1 });
		else authenticate({ chainId: 1 });
	};
	useEffect(() => {
		return () => {
			setIsShowingConnectModal(false);
		};
	}, [isAuthenticating]);

	return (
		<ModalWrapper isShowingModal={isShowingConnectModal} setIsShowingModal={setIsShowingConnectModal}>
			<div className="relative z-50 inline-block align-bottom bg-neutral-950 rounded-sm py-4 px-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-lg sm:w-full">
				<h5 className="mb-2 uppercase text-base font-semibold text-gray-200 lg:text-xl dark:text-white">Connect wallet</h5>
				<p className="text-sm font-normal text-gray-400 dark:text-gray-400">
					Connect with one of our available wallet providers or create a new one.
				</p>
				<ul className="mt-4 space-y-3">
					<button
						onClick={() => handleAuthenticate()}
						className="flex w-full justify-start items-center p-3 text-base bg-neutral-950 border border-neutral-600 font-bold text-neutral-400 rounded-sm hover:bg-neutral-800 group hover:shadow ">
						<MetamaskIcon /> <span className="ml-3 whitespace-nowrap text-neutral-100">MetaMask</span>
						<span className="inline-flex ml-auto items-center justify-center px-2 py-0.5 text-xs font-medium text-neutral-700  rounded-sm">
							Popular
						</span>
					</button>
					<button
						type="button"
						onClick={() => handleAuthenticate({ provider: "walletconnect" })}
						className="flex w-full justify-start items-center p-3 text-base bg-neutral-950 border border-neutral-600 font-bold text-neutral-400 rounded-sm hover:bg-neutral-800 group hover:shadow">
						<WalletConnectIcon />
						<span className="ml-3 whitespace-nowrap text-neutral-100">WalletConnect</span>
					</button>
				</ul>
				<div className="mt-2 px-0.5">
					<a href="#" className="inline-flex items-baseline text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
						<i className="fa-thin fa-circle-question mr-1.5"></i> Why do I need to connect with my wallet?
					</a>
				</div>
			</div>
		</ModalWrapper>
	);
};
export default ConnectModal;
