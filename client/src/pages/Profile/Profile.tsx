import React, { useEffect, useState } from "react";
import { Dispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import useMoralisHooks from "../../hooks/useMoralis";
import SettingsModal from "../../common/modal/SettingsModal/SettingsModal";

const Profile = () => {
	const [isShowingSettingsModal, setIsShowingSettingsModal] = useState<boolean>(false);
	const userData = useSelector((state: RootState) => state.userModel);
	const { getNFTs, user } = useMoralisHooks();
	const dispatch = useDispatch<Dispatch>();
	useEffect(() => {
		if (user) dispatch.userModel.loadUserProfile(user);
		if (user) dispatch.userModel.getTapeArtistsWalletIds(user?.attributes?.ethAddress.toLowerCase());
		getNFTs();
	}, [user]);

	return (
		<div className="min-h-screen">
			<SettingsModal setIsShowingSettingsModal={setIsShowingSettingsModal} isShowingSettingsModal={isShowingSettingsModal} />
			{user && userData && (
				<div className="bg-neutral-950 lg:z-10 lg:relative py-10 lg:py-12 lg:mt-1 mt-10 border-[0.25px] border-neutral-800 mx-auto">
					<div className="lg:mx-auto lg:max-w-xl lg:px-6 lg:grid lg:grid-cols-2 gap-x-4">
						<div className=" col-span-1 flex flex-col items-center justify-baseline px-2 lg:py-2 py-1">
							<img
								className="object-fill bg-neutral-900 border-fuchsia-900 border-2 rounded-full lg:ml-auto"
								src={userData?.userProfile?.profilePicture}
							/>
						</div>
						<div className=" col-span-1 self-center">
							<div className="mx-auto px-5 lg:py-4 ">
								<div className="flex flex-col md:justify-start justify-center">
									<div className="flex flex-col justify-center lg:items-start items-center mt-6 lg:mt-0 text-2xl font-base font-serif lg:max-w-xs lg:px-1.5 lg:mb-2">
										<span className="rounded-sm uppercase text-neutral-200 text-center lg:text-left">
											{user?.attributes?.ethAddress?.slice(0, 6)}
										</span>
									</div>
									<div className="lg:py-1.5 py-3 lg:px-0 px-20 rounded-lg text-neutral-300 text-[0.8em] lg:text-left tracking-wider text-center lg:max-w-xs mb-3 lg:mx-1.5">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
										et dolore magna aliqua.
									</div>
								</div>
								<div className="inline-flex items-center">
									<button
										onClick={() => setIsShowingSettingsModal(!isShowingSettingsModal)}
										className="mx-1 px-3 rounded-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 inline-flex items-center">
										<DotsHorizontalIcon className="h-4 w-4" />
									</button>
									<button
										onClick={() => setIsShowingSettingsModal(!isShowingSettingsModal)}
										className="mx-1 px-3 text-xs rounded-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 inline-flex items-center">
										verify
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="grid grid-cols-12 mx-auto gap-x-2 items-start pt-2 pb-20 px-2">
				<div className="bg-neutral-950 border-[0.25px] border-neutral-800 sm:rounded-lg rounded-sm col-span-12 lg:col-span-3">
					<div className="w-full text-left text-lg text-neutral-500 bg-neutral-900 py-1 px-3 rounded-t-lg mx-auto tracking-wider">
						BADGES
					</div>
					<div className="flex flex-col justify-center items-center gap-y-2 my-2 mx-2 gap-x-2">
						<div className="flex items-center justify-between w-full bg-gradient-to-r from-neutral-950 to-neutral-850 text-neutral-400 rounded-md p-3">
							<img
								src={
									"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/heds%2Fprofile%2Fvisitor.png?alt=media&token=d01d7cbd-8d21-44ef-a6e2-2a284b54517a"
								}
								className="w-10 h-10 rounded-full"
							/>
							<div className="flex flex-col items-end justify-end">
								<span className="font-serif tracking-widest uppercase text-right text-sm">visitor</span>
								<span className="text-neutral-500 text-opacity-80 italic text-xs text-right tracking-wider">
									Welcome to heds.
								</span>
							</div>
						</div>
						<div className="flex items-center justify-between w-full bg-gradient-to-r from-neutral-950 to-green-900 text-neutral-400 rounded-md p-3">
							<img
								src={
									"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/heds%2Fprofile%2Fcollector.png?alt=media&token=d3f6aa87-6eef-48a9-89bd-e4e70f4fefa0"
								}
								className="w-10 h-10 rounded-full"
							/>
							<div className="flex flex-col items-end justify-end">
								<span className="font-serif tracking-widest uppercase text-right text-sm">collector</span>
								<span className="text-green-500 text-opacity-80 italic text-xs text-right tracking-wider">
									Own a hedsTAPE.
								</span>
							</div>
						</div>
						<div className="flex items-center justify-between w-full  bg-gradient-to-r from-neutral-950 to-red-900 text-neutral-400 rounded-md p-3">
							<img
								src={
									"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/heds%2Fprofile%2Fartist.png?alt=media&token=2c27ab3b-8846-488d-a9fe-5128c51fcb35"
								}
								className="w-10 h-10 rounded-full"
							/>
							<div className="flex flex-col items-end justify-end">
								<span className="font-serif tracking-widest uppercase text-right text-sm">artist</span>
								<span className="text-red-500 text-opacity-80 italic text-xs text-right tracking-wider">
									Submit to a tape.
								</span>
							</div>
						</div>
						<div className="flex items-center justify-between w-full  bg-gradient-to-r from-neutral-950 to-fuchsia-900 text-neutral-400 rounded-md p-3">
							<img
								src={
									"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/heds%2Fprofile%2Fog.png?alt=media&token=6ec16d36-099b-4683-9ef7-43abbcd740cb"
								}
								className="w-10 h-10 rounded-full"
							/>
							<div className="flex flex-col items-end justify-end">
								<span className="font-serif tracking-widest uppercase text-right text-sm">OG HED</span>
								<span className="text-fuchsia-500 text-opacity-80 italic text-xs text-right tracking-wider">
									Mirror x heds contributor
								</span>
							</div>
						</div>
					</div>
				</div>
				{/*  */}
				<div className="col-span-12 lg:col-span-9 bg-neutral-950 border-[0.25px] border-neutral-800 rounded-lg">
					<div className="w-full text-left text-lg text-neutral-500 uppercase bg-neutral-900 py-1 px-3 rounded-t-lg mx-auto tracking-wider">
						COLLECTION
					</div>
					<div className="grid grid-cols-2 xl:grid-cols-5 place-items-center items-center gap-y-2 gap-x-2 m-2">
						{userData &&
							userData?.userCollection?.map((tape) => (
								<>
									{tape?.quantity > 0 && (
										<div key={tape.name} className="group relative">
											<Link to={tape.href}>
												<div className="overflow-hidden group-hover:opacity-50 opacity-75 lg:aspect-none transition-all rounded-md">
													<img
														src={tape.src}
														className={`w-full h-full object-center object-cover lg:w-full lg:h-full ${
															tape.quantity === 0 && "grayscale"
														} group-hover:grayscale-0`}
													/>
												</div>
											</Link>
										</div>
									)}
								</>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
