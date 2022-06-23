import React from "react";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import TwitterAuth from "../../../components/ProfileForms/TwitterAuth/TwitterAuth";
import { TwitterModalProps } from "../../../models/common";

const TwitterModal = ({ isShowingTwitterModal, setIsShowingTwitterModal }: TwitterModalProps) => {
	const rules = [
		{ id: "rule_1", rule: "Tweet the verified message." },
		{ id: "rule_2", rule: "Copy/paste URL of the tweet." },
		{ id: "rule_3", rule: "Confirm linked account." }
	];
	return (
		<ModalWrapper isShowingModal={isShowingTwitterModal} setIsShowingModal={setIsShowingTwitterModal}>
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
					<div className="bg-neutral-800 py-1 rounded-md my-2 px-10 mx-10 pb-3">
						<h6 className="mt-3 mb-2 text-md text-center uppercase text-blue-500">
							<i className="fa-thin fa-badge-check text-blue-500 mr-2"></i>HOW TO VERIFY
						</h6>
						<div className=" rounded-sm py-3 mx-5 sm:mx-2 px-2 sm:px-5">
							<div className="flex justify-center">
								<ul role="list" className="text-center">
									{rules.map((item, index) => (
										<li key={item.id} className="py-1 text-neutral-400 uppercase text-sm sm:text-base font-extralight">
											<span className="mr-2">{index + 1}.</span>
											<span className="text-neutral-500">{item.rule}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<div className="my-6">
						<TwitterAuth setIsShowingTwitterModal={setIsShowingTwitterModal} />
					</div>
				</div>
			</div>
		</ModalWrapper>
	);
};
export default TwitterModal;
