import React from "react";
import useMoralisHooks from "../../../hooks/useMoralis";
import { RootState, Dispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";

const BannerColorForm = () => {
	const { updateUserProfile, user } = useMoralisHooks();
	const dispatch = useDispatch<Dispatch>();
	const userProfile = useSelector((state: RootState) => state.userModel?.userProfile);
	const { currentBannerColor, bannerColors } = userProfile;

	return (
		<div className="mb-3">
			<h3 className="uppercase font-extralight text-neutral-300">Banner Color</h3>
			<div className="flex mt-3">
				{bannerColors.map((color: string, i: number) => {
					if (bannerColors[currentBannerColor] === color) {
						return (
							<span
								key={color}
								style={{
									background: color
								}}
								className="h-10 w-10 mr-1 rounded-full opacity-80 border-2 border-green-500"></span>
						);
					} else
						return (
							<button
								key={color}
								onClick={() => {
									updateUserProfile("currentBannerColor", i);
									dispatch.userModel.loadUserProfile(user);
								}}
								style={{
									background: color
								}}
								className="h-10 w-10 mr-1 rounded-full border-neutral-200 transition-color border-2 hover:border-green-500"></button>
						);
				})}
			</div>
		</div>
	);
};

export default BannerColorForm;
