import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store";

const MintModal = () => {
	// @ts-ignore
	const globalData = useSelector((state: RootState) => state.globalModel);
	const { locked, open } = useSelector((state: RootState) => state.globalModel.modal);
	const dispatch = useDispatch<Dispatch>();
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
								<div className="relative z-50 inline-block align-bottom bg-neutral-950 border-[0.25px] border-neutral-700 rounded-lg py-4 px-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-md sm:w-full"></div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default MintModal;
