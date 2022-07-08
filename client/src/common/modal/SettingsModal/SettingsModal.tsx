// @ts-nocheck
import React from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import ModalWrapper from "../../wrapper/ModalWrapper/ModalWrapper";
import { TrashIcon, UploadIcon } from "@heroicons/react/solid";

const SettingsModal = ({ isShowingSettingsModal, setIsShowingSettingsModal }: any) => {
	const userData = useSelector((state: RootState) => state.userModel);
	return (
		<ModalWrapper isShowingModal={isShowingSettingsModal} setIsShowingModal={setIsShowingSettingsModal}>
			<div className="relative z-50 inline-block align-bottom bg-neutral-950 rounded-sm py-4 px-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-md sm:w-full">
				<main className="max-w-lg mx-auto">
					<form>
						<h5 className="mb-2 uppercase text-base font-semibold text-gray-200 lg:text-xl">PROFILE SETTINGS</h5>
						<p className="text-sm font-normal text-gray-400 mb-4">Edit your profile details.</p>
						<div className="space-y-2 mb-4">
							<label className="block text-center text-sm font-semibold text-neutral-400 pt-4">Profile Picture</label>
							<div className="flex flex-col items-center my-5 py-3 rounded-sm">
								<div className="flex-shrink-0 inline-block rounded-full overflow-hidden h-52 w-52" aria-hidden="true">
									<img className="rounded-full h-full w-full" src={userData?.userProfile?.profilePicture} alt="" />
								</div>
								<div className="flex justify-evenly gap-x-2 mt-5">
									<button className="px-4 text-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none">
										<UploadIcon className="h-3 w-3" />
									</button>
									<button className="px-4 text-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none">
										<TrashIcon className="h-3 w-3" />
									</button>
								</div>
							</div>
							<p className="text-sm text-left font-medium text-neutral-400 pb-1" aria-hidden="true">
								Account details
							</p>
							<div className="flex w-full justify-between items-baseline px-1 py-2 bg-neutral-950 border border-neutral-600 font-semibold text-neutral-400 rounded-sm hover:bg-neutral-800 group hover:shadow ">
								<label className="mx-2 text-sm whitespace-nowrap text-neutral-400">Linked Wallet:</label>
								<div className="text-green-500 font-thin italic text-sm truncate mx-1">
									{userData?.userProfile?.ethAddress}
								</div>
							</div>
							<div className="flex w-full justify-between items-center px-1 py-2 bg-neutral-950 border border-neutral-600 font-semibold text-neutral-400 rounded-sm hover:bg-neutral-800 group hover:shadow ">
								<label className="mx-2 text-sm whitespace-nowrap text-neutral-400">Twitter Verification:</label>
								<div className="text-green-500 font-thin italic text-sm truncate mx-1">
									@{userData?.userProfile?.twitterHandle}
								</div>
							</div>
							<div className="flex w-full justify-between items-center px-1 py-2 bg-neutral-950 border border-neutral-600 font-semibold text-neutral-400 rounded-sm hover:bg-neutral-800 group hover:shadow ">
								<label className="mx-2 text-sm whitespace-nowrap text-neutral-400">Badges:</label>
								<div className="text-green-500 font-thin italic text-sm truncate mx-1">
									OG HED, ARTIST, COLLECTOR, VISITOR
								</div>
							</div>
							<div className="mb-7 pt-4">
								<label htmlFor="description" className="block text-sm font-semibold text-neutral-400 pb-1">
									Description:
								</label>
								<div className="mt-1.5">
									<textarea
										id="description"
										name="description"
										rows={3}
										className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-sm border border-neutral-700 bg-neutral-900 text-neutral-200"
										defaultValue={""}
									/>
								</div>
							</div>
							<div className="gap-x-2 flex justify-center items-center pt-4">
								<button className="px-4 text-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none">
									DISCARD
								</button>
								<button className="px-4 text-sm border-2 border-green-800 bg-green-900 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none">
									UPDATE
								</button>
							</div>
						</div>
					</form>
				</main>
			</div>
		</ModalWrapper>
	);
};
export default SettingsModal;
