import { useState } from "react";
import { useMoralis, useMoralisFile, useMoralisWeb3Api, useNFTBalances } from "react-moralis";
import { Dispatch } from "../store";
import parseUserCollection from "../utils/parseUserCollection";
import { useDispatch } from "react-redux";
import Moralis from "moralis/types";

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

	const getNFTs = async () => {
		const balance = await getNFTBalances();
		if (balance) {
			const formattedOwnership = parseUserCollection(balance);
			dispatch.userModel.setUserCollection(formattedOwnership);
		}
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
		updateUserProfile,
	};
};

export default useMoralisHooks;
