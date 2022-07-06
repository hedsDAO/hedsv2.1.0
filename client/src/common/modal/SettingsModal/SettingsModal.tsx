import React from "react";
import { Dispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../../wrapper/ModalWrapper/ModalWrapper";
import { TrashIcon, UploadIcon } from "@heroicons/react/solid";

const SettingsModal = ({ isShowingSettingsModal, setIsShowingSettingsModal }: any) => {
	const dispatch = useDispatch<Dispatch>();
	const userData = useSelector((state: RootState) => state.userModel);

	return (
		<ModalWrapper isShowingModal={isShowingSettingsModal} setIsShowingModal={setIsShowingSettingsModal}>
			<div className="relative z-50 inline-block align-bottom bg-neutral-950 rounded-sm py-8 px-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-md sm:w-full">
				<main className="max-w-lg mx-auto">
					<form>
						<div className="mb-10 px-3">
							<h1 className="text-lg leading-6 font-medium text-neutral-400">Profile Settings</h1>
							<p className="text-sm text-neutral-600">Update your profile details.</p>
						</div>
						<div className="space-y-4">
							<p className="text-sm text-center font-medium text-neutral-500" aria-hidden="true">
								Profile Picture
							</p>
							<div className="flex flex-col items-center mb-5">
								<div className="flex-shrink-0 inline-block rounded-full overflow-hidden h-40 w-40" aria-hidden="true">
									<img className="rounded-full h-full w-full" src={userData?.userProfile?.profilePicture} alt="" />
								</div>
								<div className="flex justify-evenly gap-x-2 mt-4">
									<button className="px-4 text-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm">
										<UploadIcon className="h-3 w-3" />
									</button>
									<button className="px-4 text-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm">
										<TrashIcon className="h-3 w-3" />
									</button>
								</div>
							</div>
							<div className="px-3">
								<label className="text-sm font-medium text-neutral-500">Linked Wallet:</label>
								<div className="text-green-500 font-thin italic">{userData?.userProfile?.ethAddress}</div>
							</div>
							<div className="px-3">
								<label className="text-sm font-medium text-neutral-500">Badges:</label>
								<div className="text-neutral-600 font-thin italic">OG HED, ARTIST, COLLECTOR, VISITOR</div>
							</div>
							<div className="px-3">
								<label className="text-sm font-medium text-neutral-500">Verified:</label>
								<div className="text-green-500 font-thin italic">@{userData?.userProfile?.twitterHandle}</div>
							</div>
							<div className="px-3">
								<label htmlFor="description" className="block text-sm font-medium text-neutral-500">
									Description
								</label>
								<div className="mt-1.5">
									<textarea
										id="description"
										name="description"
										rows={3}
										className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-sm border-[0.25px] border-neutral-700 bg-neutral-900 text-neutral-200"
										defaultValue={""}
									/>
								</div>
							</div>
						</div>
					</form>
				</main>
			</div>
		</ModalWrapper>
	);
};
export default SettingsModal;
