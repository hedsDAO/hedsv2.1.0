import React from "react";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import TwitterAuth from "../../../components/ProfileForms/TwitterAuth/TwitterAuth";
import CustomButton from "../../buttons/CustomButton/CustomButton";
import { TwitterWarningModalProps } from "../../../models/common";

const TwitterWarningModal = ({ isShowingTwitterWarningModal, setIsShowingTwitterWarningModal }:  TwitterWarningModalProps) => {
	return (
		<ModalWrapper isShowingModal={isShowingTwitterWarningModal} setIsShowingModal={setIsShowingTwitterWarningModal}>
			<div
				className={`relative inline-block align-bottom bg-neutral-900 
							rounded-sm px-3 pt-6 pb-8 text-left overflow-hidden
							shadow-xl transform transition-all sm:my-8 sm:align-middle 
							md:max-w-lg w-full`}>
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-700">
					<i className="fa-brands fa-twitter text-neutral-200 -mb-0.5"></i>
				</div>
				<div className="mt-3 sm:mt-5 flex flex-col">
					<h3 className="text-2xl text-center leading-6 text-neutral-200 font-extralight uppercase">VERIFY</h3>
					<h6 className="mb-8 mt-2 text-sm text-center leading-6 text-neutral-400 font-extralight uppercase">WITH TWITTER</h6>
					<h6 className="mb-2 text-lg text-center font-extralight uppercase text-neutral-100">
						<i className="fa-thin fa-circle-exclamation text-red-500 mr-2"></i>VERIFY TO CONTINUE
					</h6>
					<p className="text-amber-500 font-thin text-center text-sm mb-4 px-20">
						To download a sample or submit a flip, you must verify your account via twitter.
					</p>
					<div className="my-6">
						<TwitterAuth setIsShowingTwitterModal={isShowingTwitterWarningModal} />
					</div>
					<div className="flex justify-center mt-8">
						<CustomButton onClick={() => setIsShowingTwitterWarningModal(false)} color={"neutral"} className="mx-1 my-1">
							back
						</CustomButton>
					</div>
				</div>
			</div>
		</ModalWrapper>
	);
};
export default TwitterWarningModal;
