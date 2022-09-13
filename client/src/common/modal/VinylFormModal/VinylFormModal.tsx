import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store";

const VinylFormModal = () => {
    const { open } = useSelector((state: RootState) => state.globalModel.modal);
    const dispatch = useDispatch<Dispatch>();

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[60]"
                onClose={() => dispatch.globalModel.setModalVisibility(false)}>
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
                                            <p className="text-sm font-semibold text-teal-500 mb-4 uppercase tracking-widest">
                                                <i className="fa-solid fa-circle-check text-teal-500 mr-2"></i>
                                                Good Society x Heds
                                            </p>
                                            <div className="text-neutral-400 uppercase text-sm">
                                                Link for Vinyl Redemption Shipping Form
                                            </div>
											<div className="text-neutral-500 text-xs text-center mt-2 w-1/2 mb-4">
                                                note: The information on the form is only used for shipping purposes and is not stored on heds.
                                            </div>
											<a href="https://heds.formstack.com/forms/good_society_vinyl" target="_blank">
                                            <button className="bg-neutral-800 uppercase text-sm text-neutral-300 py-1 hover:bg-neutral-900 rounded-sm px-3 transition-all">
                                                Redeem
                                            </button>
											</a>
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

export default VinylFormModal;
