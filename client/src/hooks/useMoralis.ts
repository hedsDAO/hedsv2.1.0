import { useState } from "react";
import { useMoralis, useMoralisFile, useNFTBalances } from "react-moralis";
import { Dispatch } from "../store";
import { parseAddresses } from "../utils/parseAddresses";
import { useDispatch } from "react-redux";
import Moralis from "moralis/types";
import { CollectionTank } from "../models/common";

interface MoralisFile extends Moralis.File {
	_hash?: string;
}

const useMoralisHooks = () => {
	const { saveFile } = useMoralisFile();
	const { refetchUserData, setUserData, user } = useMoralis();
	const { getNFTBalances } = useNFTBalances({ chain: "0x1" });
	const [ensResult, setEnsResult] = useState<string>();
	const dispatch = useDispatch<Dispatch>();
	//   const IPFS_BASE_URL = "https://ipfs.io/ipfs/";

	// 1. GET USER TAPE COLLECTION
	const getNFTs = async () => {
		await getNFTBalances().then((balance) => {
			let collection: CollectionTank = parseAddresses(balance?.result);
			dispatch.userModel.setCollection(collection);
		});
	};
	const uploadFile = async (file: File) => {
		dispatch.submissionsModel.setLoading(true);
		if (file) {
			await saveFile("sample.wav", file, { saveIPFS: true }).then((res: MoralisFile | undefined) => {
				dispatch.submissionsModel.setCurrentSubmission(`${res?._hash}`);
				dispatch.submissionsModel.setLoading(false);
			});
		} else {
			dispatch.submissionsModel.setLoading(false);
			alert("no file provided");
		}
	};

	const uploadProfilePicture = async (file: File) => {
		let hash = '';
		if (file) {
			await saveFile("profile", file, { saveIPFS: true }).then((res: MoralisFile | undefined) => {
				hash = `${res?._hash}`;
			});
		} else {
			alert("no file provided");
		}
		return hash;
	};

	const updateUserProfile = (attribute: string, idx: number) => {
		setUserData({ [attribute]: idx });
		refetchUserData();
	};

	const updateEnsMoralis = () => {
		const usersCurrentNames = user?.attributes?.userDisplayNames;
		usersCurrentNames.push(ensResult);
		setUserData({ ensName: ensResult, userDisplayNames: usersCurrentNames });
		refetchUserData();
		return ensResult;
	};

	return {
		ensResult,
		getNFTs,
		setEnsResult,
		setUserData,
		refetchUserData,
		updateEnsMoralis,
		user,
		uploadFile,
		uploadProfilePicture,
		updateUserProfile,
	};
};

export default useMoralisHooks;
