import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import Moralis from "moralis/types";
import { UserState } from "../../../models/userModel";
import defaultImg from "/public/images/default.png";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { Modals } from "../../../models/globalModel";
import SplitsIcon from "../../../common/svg/SplitsIcon/SplitsIcon";

const ProfileHeader = ({ user, userData }: { user: Moralis.User<Moralis.Attributes> | null; userData: UserState }) => {
	const dispatch = useDispatch<Dispatch>();
	// @ts-ignore
	const globalData = useSelector((state: RootState) => state.globalModel);
	return (
		<div className="border-neutral-500 dark:border-neutral-950 rounded-md lg:max-w-6xl flex lg:justify-start justify-center mx-auto">
			<div className="py-7 rounded-md">
				<div className="lg:mx-auto lg:max-w-xl lg:grid lg:grid-cols-2 gap-x-4">
					<div className="col-span-1 flex flex-col items-center justify-baseline lg:max-w-[18rem] md:max-h-[18rem] max-h-[12rem]">
						<img
							className={`lg:w-full md:min-w-[18rem] md:min-h-[18rem] max-w-[12rem] min-w-[12rem] min-h-[12rem] md:max-w-md bg-neutral-300 dark:bg-neutral-800 p-1.5 object-cover mx-auto lg:ml-auto rounded-xl shadow-sm`}
							src={userData?.profilePicture || defaultImg}
						/>
					</div>
					<div className="col-span-1 self-center">
						<div className="mx-auto px-5 lg:px-8 lg:py-3">
							<div className="flex flex-col md:justify-start justify-center">
								<div className="flex flex-col justify-center lg:items-start items-center mt-6 lg:mt-0 text-3xl font-base font-serif lg:max-w-xs lg:px-1.5 lg:mb-0 mb-1">
									<span className="rounded-sm uppercase text-neutral-500 dark:text-neutral-300 tracking-widest text-center lg:text-left">
										{user?.attributes?.ethAddress?.slice(0, 6)}
									</span>
								</div>
								{userData?.twitterHandle && (
									<div className="flex flex-col justify-center lg:items-start items-center mt-3 text-xs font-base font-serif lg:max-w-xs lg:px-1.5 lg:mb-0 mb-1 lg:mt-1">
										<span className="rounded-sm uppercase text-neutral-500 dark:text-neutral-300 tracking-widest text-center lg:text-left">
											<i className="fa-brands fa-twitter mr-2" />
											{userData?.twitterHandle}
										</span>
									</div>
								)}
								<div className="lg:py-1.5 py-3 lg:px-0 px-20 rounded-lg text-neutral-400 dark:text-neutral-200 text-[0.8em] lg:text-left tracking-wider text-center lg:max-w-xs mb-3 lg:mx-1.5 break-words">
									{userData?.description || <span className="italic font-thin">no description</span>}
								</div>
							</div>
							<div className="inline-flex lg:justify-start justify-center items-center w-full">
								<button
									onClick={() => dispatch.globalModel.setModal({ open: true, modal: Modals.SETTINGS, locked: true })}
									className="mx-1 px-3 py-0.5 rounded-sm border-1 border-neutral-500 dark:border-neutral-800 bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 inline-flex items-center">
									<DotsHorizontalIcon className="h-4 w-4" />
								</button>
								{userData?.splitsBalance && (
									<button className="mx-1 px-2 py-0.5 rounded-sm border-1 border-neutral-500 dark:border-neutral-800 bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 inline-flex items-center">
										<a
											target="_blank"
											className="flex justify-start items-center gap-x-1"
											href={`https://app.0xsplits.xyz/accounts/${user?.attributes?.ethAddress.toLowerCase()}`}>
											<div className="inline dark:hidden"><SplitsIcon color="#121212" /></div>
											<div className="dark:inline hidden"><SplitsIcon /></div>
											<span className="ml-1 text-xs font-semibold">{userData?.splitsBalance.slice(0, 5)}</span>
											<span className="font-regular text-xs">ETH</span>
										</a>
									</button>
								)}
								{userData?.isVinylAddress && (
									<button
										onClick={() => dispatch.globalModel.setModal({ open: true, modal: Modals.VINYL_FORM, locked: false })}
										className="mx-1 px-2 py-0.5 text-xs rounded-sm border-1 border-neutral-500 dark:border-neutral-800 bg-teal-300 dark:bg-teal-700 text-neutral-900 dark:text-neutral-300 inline-flex items-center tracking-widest whitespace-nowrap">
										<div className="flex items-center gap-x-2">
										<i className="fa-duotone fa-record-vinyl text-xs"></i>
										<span className="text-xs">REDEEM</span>
										</div>
									</button>
								)}
								{userData?.twitterHandle?.length === 0 && (
									<button
										onClick={() => dispatch.globalModel.setModal({ open: true, modal: Modals.TWITTER, locked: true })}
										className="mx-1 px-3 py-0.5 text-xs rounded-sm border-1 border-neutral-500 dark:border-neutral-800 bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 inline-flex items-center tracking-widest">
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
