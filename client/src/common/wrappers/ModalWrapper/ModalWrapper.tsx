import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

/**
 * @name ModalWrapper
 * @version 2.0.0
 * @description All TW modals use the same dialog and transition groups, this component
 * serves as a wrapper to leverage reusable code.
 *
 * @param {Boolean} isShowingModal boolean representing display state of modal
 * @param {Dispatch} setIsShowingModal sets state for showing modal
 * @param {any} children the modal content to be wrapped.
 */

const ModalWrapper = ({ isShowingModal, setIsShowingModal, children }: any) => {
	return (
		<Transition.Root show={isShowingModal} as={Fragment}>
			<Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto" onClose={() => setIsShowingModal(false)}>
				<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
					</Transition.Child>
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
						{children}
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default ModalWrapper;
