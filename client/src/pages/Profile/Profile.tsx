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
	const dispatch = useDispatch<Dispatch>();
	const history = useHistory();
	const userData = useSelector((state: RootState) => state.userModel);
	const { getNFTs, user } = useMoralisHooks();
	const { isUnauthenticated } = useMoralis();
	useEffect(() => {
		if (!userData?.collection) getNFTs();
		if (!userData?.isTapeArtist) dispatch.userModel.getTapeArtistsWalletIds(user?.attributes?.ethAddress.toLowerCase());
		if (!userData?.isVinylAddress) dispatch.userModel.getVinylAddress(user?.attributes?.ethAddress.toLowerCase());
	}, [userData]);
	useEffect(() => {
		if (isUnauthenticated) history.push("/explore");
	}, []);
	return (
		<div className="min-h-screen bg-gradient-to-b">
			{/* @ts-ignore */}
			{user && userData && <ProfileHeader user={user} userData={userData} />}
			<div className="grid grid-cols-12 gap-x-1 w-full max-w-6xl mx-auto rounded-lg pb-2">
				<Collection {...userData} />
				<Badges {...userData} />
			</div>
		</div>
	);
};

export default Profile;
