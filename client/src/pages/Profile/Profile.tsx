import React, { useEffect } from "react";
import { Dispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useMoralis } from "react-moralis";
import useMoralisHooks from "../../hooks/useMoralis";
import Badges from "../../components/Profile/Badges/Badges";
import Collection from "../../components/Profile/Collection/Collection";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";
import { useHistory } from "react-router";

const Profile = () => {
	const history = useHistory();
	const userData = useSelector((state: RootState) => state.userModel);
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const { getNFTs, user } = useMoralisHooks();
	const { isAuthenticated, isUnauthenticated } = useMoralis();
	const dispatch = useDispatch<Dispatch>();
	useEffect(() => {
		console.log(isAuthenticated);
		if (!spaceData) dispatch.spaceModel.getSpaceData("heds");
		if (user) dispatch.userModel.getUserData(user?.attributes?.ethAddress);
		if (userData) getNFTs();
	}, [user]);
	useEffect(() => {
		if (!isAuthenticated && !user) history.push("/explore")
		if (isUnauthenticated) history.push("/explore");
	}, []);
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
