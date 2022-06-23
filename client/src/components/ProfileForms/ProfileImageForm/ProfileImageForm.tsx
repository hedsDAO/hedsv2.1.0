import React from "react";
import useMoralisHooks from "../../../hooks/useMoralis";
import { RootState, Dispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";

const ProfileImageForm = () => {
	const { updateUserProfile, user } = useMoralisHooks();
	const dispatch = useDispatch<Dispatch>();
	const userProfile = useSelector((state: RootState) => state.userModel?.userProfile);
	const { currentUserImage, userImages } = userProfile;

	return (
		<div className="mb-10">
			<h3 className="uppercase text-lg font-extralight text-neutral-300">Profile Image</h3>
			<p className="text-neutral-500 text-xs mb-2">More options will populate with verification and community interactions.</p>
			<div className="flex mt-3">
				{userImages?.map((imageLink: string, i: number) => {
					if (userImages[currentUserImage] === imageLink) {
						return <img key={imageLink} src={imageLink} className="h-10 w-10 mr-1 rounded-full border-2 border-green-500" />;
					} else
						return (
							<img
								key={imageLink}
								onClick={() => {
									updateUserProfile("currentUserImage", i);
									dispatch.userModel.loadUserProfile(user);
								}}
								src={imageLink}
								className="h-10 w-10 mr-1 rounded-full border-neutral-300 transition-color border-2 hover:border-green-500"
							/>
						);
				})}
			</div>
		</div>
	);
};

export default ProfileImageForm;
