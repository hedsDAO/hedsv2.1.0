import React, { useEffect } from "react";
import { Dispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import useMoralisHooks from "../../hooks/useMoralis";
import Badges from "../../components/Profile/Badges/Badges";
import Collection from "../../components/Profile/Collection/Collection";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";

const Profile = () => {
	const userData = useSelector((state: RootState) => state.userModel);
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const { getNFTs, user } = useMoralisHooks();
	const dispatch = useDispatch<Dispatch>();
	useEffect(() => {
		if (!spaceData) dispatch.spaceModel.getSpaceData("heds");
		if (user) dispatch.userModel.getUserData(user?.attributes?.ethAddress);
		if (userData) getNFTs();
	}, [user]);
	return (
		<div className="min-h-screen bg-neutral-900">
			{user && userData && <ProfileHeader user={user} userData={userData} />}
			<div className="grid grid-cols-12 gap-x-1 w-full max-w-6xl mx-auto rounded-lg pb-2">
				<Collection {...userData} />
				<Badges {...userData} />
			</div>
		</div>
	);
};

export default Profile;
