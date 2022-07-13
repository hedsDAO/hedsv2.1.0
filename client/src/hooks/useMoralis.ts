import { useState } from "react";
import { useMoralis, useMoralisFile, useMoralisWeb3Api, useNFTBalances } from "react-moralis";
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
	const Web3Api = useMoralisWeb3Api();
	const { getNFTBalances } = useNFTBalances({ chain: "0x1" });
	const [ensResult, setEnsResult] = useState<string>();
	const dispatch = useDispatch<Dispatch>();
	//   const IPFS_BASE_URL = "https://ipfs.io/ipfs/";

	// 1. GET USER TAPE COLLECTION
	const getNFTs = async () => {
		await getNFTBalances().then((balance) => {
			console.log(balance);
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
		console.log('here')
		let hash = '';
		if (file) {
			await saveFile("profile", file, { saveIPFS: true }).then((res: MoralisFile | undefined) => {
				console.log(`${res?._hash}`)
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

	const fetchEns = async () => {
		try {
			await Web3Api.resolve.resolveAddress().then((res) => {
				res?.name ? setEnsResult(res?.name) : setEnsResult(undefined);
			});
		} catch (e) {
			console.log(e);
			alert("ENS name not registered with this address");
		}
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
		fetchEns,
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
