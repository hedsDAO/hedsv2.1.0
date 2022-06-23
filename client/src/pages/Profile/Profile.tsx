import React, { useEffect } from "react";
import { Dispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import useMoralisHooks from "../../hooks/useMoralis";
import profileTestImg from "../../../../public/2.png";
import TapeCard from "../../common/cards/TapeCard/TapeCard";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";

const stats = [
	{ name: "Total Subscribers", stat: "71,897", previousStat: "70,946", change: "12%", changeType: "increase" },
	{ name: "Avg. Open Rate", stat: "58.16%", previousStat: "56.14%", change: "2.02%", changeType: "increase" },
	{ name: "Avg. Click Rate", stat: "24.57%", previousStat: "28.62%", change: "4.05%", changeType: "decrease" },
];

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

const Profile = () => {
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const { hedstapes } = globalTapesData;
	const { getNFTs, user } = useMoralisHooks();
	const dispatch = useDispatch<Dispatch>();

	useEffect(() => {
		if (user) dispatch.userModel.loadUserProfile(user);
		if (user) dispatch.userModel.getTapeArtistsWalletIds(user?.attributes?.ethAddress.toLowerCase());
		if (user) dispatch.submissionsModel.loadUserFavorties(["heds", "hedstape", "5", user?.attributes?.ethAddress]);
		getNFTs();
	}, [user]);

	return (
		<>
			{user && (
				<div className="bg-gradient-to-t from-fuchsia-900 to-neutral-900 lg:pb-0 lg:z-10 lg:relative py-3 lg:py-5 lg:mt-20 mt-10">
					<div className="lg:mx-auto lg:max-w-7xl lg:px-6 lg:grid lg:grid-cols-2 gap-x-4">
						<div className="flex flex-col items-center justify-center lg:-my-10 px-2 lg:py-2 py-1">
							<img
								className="object-fill w-[16rem] h-[16rem] bg-neutral-900 border-fuchsia-900 border-2 p-1 rounded-full lg:ml-auto"
								src={profileTestImg}
							/>
						</div>
						<div className="mt-1 sm:mt-2 lg:m-0">
							<div className="mx-auto max-w-md px-2 sm:max-w-2xl lg:py-4 lg:max-w-none">
								<div className="flex flex-col md:justify-start justify-center">
									<div className="flex flex-col justify-center lg:items-start items-center mt-6 lg:mt-0 text-3xl font-base font-serif lg:max-w-xs lg:px-1.5 lg:mb-4">
										<span className="rounded-sm uppercase text-neutral-200 text-center lg:text-left">
											{user?.attributes?.ethAddress?.slice(0, 6)}
										</span>
										<div className="flex justify-center lg:justify-start items-baseline gap-x-2 text-sm lg:text-sm font-base font-serif text-gray-400 text-center lg:text-left lg:px-1 my-2">
											{user?.attributes?.twitterHandle && <i className="fa-brands fa-twitter-square"></i>}
											{!user?.attributes?.ensHandle && <i className="fak fa-ens"></i>}
											{!user?.attributes?.catalogHandle && <i className="fak fa-catalog"></i>}
										</div>
									</div>
									<div className="lg:py-1.5 py-3 lg:px-0 px-20 rounded-lg text-neutral-300 mt-1 text-[0.9em] lg:text-left tracking-wider text-center lg:max-w-xs mb-3 lg:mx-1.5">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
										et dolore magna aliqua.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="flex gap-x-3 w-full lg:max-w-7xl mx-auto mt-2 lg:mt-20 px-5">
				<div className="flex justify-start uppercase font-thin text-fuchsia-200 tracking-widest text-lg lg:text-xl mb-3 lg:mb-4 w-full">
					collection
				</div>
			</div>
			<hr className="w-full mx-auto border-[0.25px] border-fuchsia-900" />
			<div className="grid grid-cols-2 mx-auto lg:grid-cols-5 lg:max-w-7xl lg:gap-2 items-center px-3 py-5 lg:p-5">
				{hedstapes?.map((tape) => {
					return (
						<div className="mx-2 lg:mx-0.25">
							<TapeCard tape={tape} />
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Profile;
