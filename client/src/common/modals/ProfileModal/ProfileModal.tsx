import React from "react";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import DisplayNameForm from "../../../components/ProfileForms/DisplayNameForm/DisplayNameForm";
import ProfileImageForm from "../../../components/ProfileForms/ProfileImageForm/ProfileImageForm";
import BannerColorForm from "../../../components/ProfileForms/BannerColorForm/BannerColorForm";
import { ProfileModalProps } from "../../../models/common";

const ProfileModal = ({ isShowingProfileModal, setIsShowingProfileModal }: ProfileModalProps) => {
	return (
		<ModalWrapper isShowingModal={isShowingProfileModal} setIsShowingModal={setIsShowingProfileModal}>
			<div
				className={`relative inline-block align-bottom bg-neutral-900 
							rounded-sm px-3 pt-6 pb-8 text-left overflow-hidden
							shadow-xl transform transition-all sm:my-8 sm:align-middle 
							md:max-w-lg w-full`}>
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-700">
					<i className="fa-thin fa-gear text-neutral-200 -mb-0.5"></i>
				</div>
				<h3 className="mb-8 mt-4 text-2xl text-center leading-6 text-neutral-200 font-extralight uppercase">SETTINGS</h3>
				<div className="mt-3 sm:mt-2 flex flex-col px-8 md:px-10 lg:px-16">
					<hr className="border-neutral-600" />
					<div className="flex flex-col items-stretch rounded-sm mx-1 px-6 py-5">
						<ProfileImageForm />
						<DisplayNameForm />
						<BannerColorForm />
					</div>
					<hr className="border-neutral-600" />
					<div className="flex justify-center mt-8">
						<button
							onClick={() => setIsShowingProfileModal(false)}
							type="button"
							className="inline-flex font-sans uppercase items-center px-4 py-2 border border-gray-300 shadow-sm text-sm rounded-none text-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Back
						</button>
					</div>
				</div>
			</div>
		</ModalWrapper>
	);
};
export default ProfileModal;
