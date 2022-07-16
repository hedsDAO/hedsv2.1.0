import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store";
import { useMoralis } from "react-moralis";
import LoadingIcon from "../../svg/LoadingIcon/LoadingIcon";

const VoteModal = () => {
	const history = useHistory();
	const [loading, setLoading] = useState<boolean>(false);
	const { space, tape, id } = useSelector((state: RootState) => state.globalModel);
	const { locked, open } = useSelector((state: RootState) => state.globalModel.modal);
	const dispatch = useDispatch<Dispatch>();
	const { enableWeb3, isWeb3EnableLoading, isWeb3Enabled, deactivateWeb3 } = useMoralis();
	useEffect(() => {
		deactivateWeb3();
		return () => {
			dispatch.globalModel.setModalVisibility(false);
		};
	}, []);
	useEffect(() => {
		if (isWeb3Enabled) setLoading(true);
		(() =>
			setTimeout(() => {
				setLoading(false);
				dispatch.globalModel.setModalVisibility(false);
				history.push(`/vote/${space}/${tape}/${+id}`);
			}, 2000))();
	}, [isWeb3Enabled]);
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
								<div className="relative z-50 inline-block align-bottom bg-neutral-950 border-[0.25px] border-neutral-700 rounded-lg py-4 px-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-md sm:w-full">
									<main className="max-w-lg mx-auto">
										<div className="flex flex-col h-full items-center justify-center py-5 mt-1">
											<div className="gap-x-2 flex justify-center items-stretch">
												{loading ? (
													<LoadingIcon />
												) : (
													<Fragment>
														<button
															onClick={() => dispatch.globalModel.setModalVisibility(false)}
															className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-800 transition-all">
															Back
														</button>
														<button
															disabled={isWeb3EnableLoading}
															onClick={() => enableWeb3()}
															className="px-4 py-1 text-sm bg-green-900 hover:bg-green-800 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
															Authenticate
														</button>
													</Fragment>
												)}
											</div>
										</div>
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

export default VoteModal;
