import React from "react";
import Moralis from "moralis/types";
import { UserState } from "../../../models/userModel";
import defaultImg from "/public/images/default.png";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

const ProfileHeader = ({ user, userData }: { user: Moralis.User<Moralis.Attributes> | null; userData: UserState }) => {
	return (
		<div className="border-neutral-950 rounded-lg max-w-6xl flex justify-start mx-auto">
			<div className="bg-neutral-900 py-7 rounded-lg">
				<div className="lg:mx-auto lg:max-w-xl lg:grid lg:grid-cols-2 gap-x-4">
					<div className="col-span-1 flex flex-col items-center justify-baseline px-2 lg:py-2 py-1">
						<img
							className="lg:w-full max-w-[18rem] md:max-w-md object-fill bg-neutral-900 lg:ml-auto rounded-lg"
							src={userData?.profilePicture?.length || defaultImg}
						/>
					</div>
					<div className="col-span-1 self-center">
						<div className="mx-auto px-5 lg:py-3">
							<div className="flex flex-col md:justify-start justify-center">
								<div className="flex flex-col justify-center lg:items-start items-center mt-6 lg:mt-0 text-2xl font-base font-serif lg:max-w-xs lg:px-1.5 lg:mb-0 mb-1">
									<span className="rounded-sm uppercase text-neutral-400 tracking-widest text-center lg:text-left">
										{user?.attributes?.ethAddress?.slice(0, 6)}
									</span>
								</div>
								<div className="lg:py-1.5 py-3 lg:px-0 px-20 rounded-lg text-neutral-300 text-[0.8em] lg:text-left tracking-wider text-center lg:max-w-xs mb-3 lg:mx-1.5">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua.
								</div>
							</div>
							<div className="inline-flex lg:justify-start justify-center items-center w-full">
								<button
									// onClick={() => setIsShowingSettingsModal(!isShowingSettingsModal)}
									className="mx-1 px-3 rounded-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 inline-flex items-center">
									<DotsHorizontalIcon className="h-4 w-4" />
								</button>
								{userData?.twitterHandle?.length === 0 && (
									<button
										// onClick={() => setIsShowingSettingsModal(!isShowingSettingsModal)}
										className="mx-1 px-3 text-xs rounded-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 inline-flex items-center">
										verify
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
