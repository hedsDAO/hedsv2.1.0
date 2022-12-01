import React, { useEffect } from "react";
import { Dispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useMoralis } from "react-moralis";
import useMoralisHooks from "../../hooks/useMoralis";
import Badges from "../../components/Profile/Badges/Badges";
import Collection from "../../components/Profile/Collection/Collection";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";
import { useHistory } from "react-router";
import { useAccount, useConnect } from 'wagmi' ;
import { EditionConfig, MintConfig, SoundClient } from '@soundxyz/sdk';
import { contractAddresses } from '@soundxyz/sound-protocol';
import { ContractTransaction } from 'ethers';
import { chain } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const Profile = () => {
	const dispatch = useDispatch<Dispatch>();
	const history = useHistory();
	const userData = useSelector((state: RootState) => state.userModel);
	const { getNFTs, user } = useMoralisHooks();
	const { isUnauthenticated } = useMoralis();
	const { isConnected } = useAccount()
	const { connectAsync } = useConnect();  
	const connector = new MetaMaskConnector({
		chains: [chain.mainnet, chain.goerli],
	  })
	useEffect(() => {
		if (!userData?.collection) getNFTs();
		if (!userData?.isTapeArtist) dispatch.userModel.getTapeArtistsWalletIds(user?.attributes?.ethAddress.toLowerCase());
		if (!userData?.isVinylAddress) dispatch.userModel.getVinylAddress(user?.attributes?.ethAddress.toLowerCase());
	}, [userData]);
	useEffect(() => {
		if (isUnauthenticated) history.push("/explore");
	}, []);

	const createEdition = async (): Promise<ContractTransaction> => {
		console.log(isConnected)
		if (!isConnected) {
			console.log(connector)
			const data = await connectAsync({ connector })
			// console.log(isConnected)
			console.log(data)
		}

        const signer = await connector?.getSigner();
		console.log(signer)
        const client = SoundClient({
        signer,
        soundCreatorAddress: contractAddresses.mainnet.soundCreatorV1,
        });
        const salt = "heds";

        const editionConfig: EditionConfig = {
            name: "hedsTAPE 10",
            symbol: "HT10",
            metadataModule: "0x3ca50e8da8c3d359fc934aea0161f5346ccb62a1",
            baseURI: "https://www.heds.cloud/ipfs/QmdZkEZxvzSANwvPR72Ay3L2ZTG1bx4EyY6acTaGn2bvfA/",
            contractURI: "https://www.heds.cloud/ipfs/QmZK2a5YMLjm4BWyJuDJGmeLHrkZbZcXCtvcKVyZzNa6C7",
            fundingRecipient: "0x743c4cd7754cd30B6f00c5be74F6c2A99A523008",
            royaltyBPS: 1000,
            editionMaxMintableLower: 25,
            editionMaxMintableUpper: 50,
            editionCutoffTime: 1670097599,
            shouldFreezeMetadata: false,
            shouldEnableMintRandomness: true,
          };
           
          const mintConfigs: MintConfig[] = [{
            minterAddress: "0x4552f8b70a72a8ea1084bf7b7ba50f10f2f9daa7",
            price: BigInt(100000000000000000),
            startTime: 1670011200,
            endTime: 1670097600,
            affiliateFeeBPS: 1000,
            mintType: 'RangeEdition',
            cutoffTime: 1670097599,
            maxMintableLower: 25,
            maxMintableUpper: 50,
            maxMintablePerAccount: 3,
          }];

		//   const gasLimit = BigInt(969280)
          return await client.createEdition({
            editionConfig,
			// gasLimit,
            mintConfigs,
            salt,
          });
		};

		const mintEdition = async () => {
			const signer = await connector?.getSigner();
			console.log(signer)
			const client = SoundClient({signer});
			const editionAddress = "0x9f396644EC4b2A2bc3C6Cf665d29165Dde0e83F1";
			const mintSchedule = (await client.activeMintSchedules({ editionAddress })).shift()
			console.log(mintSchedule)
			if (!mintSchedule) throw Error(`No active mint schedule available!`)
	
			// Transaction
			const mintTransaction = await client.mint({
			mintSchedule,
			quantity: 1,
			});
			console.log(await mintTransaction.wait())
			return mintTransaction.hash;
		};


        

	return (
		<div className="min-h-screen bg-gradient-to-b">
			{/* @ts-ignore */}
			{user && userData && <ProfileHeader user={user} userData={userData} />}
			<div className="grid grid-cols-12 gap-x-1 w-full max-w-6xl mx-auto rounded-lg pb-2">
				<div>
				<button color="white" onClick={ async () => {
					// console.log(contractAddresses.goerli)
					const result = mintEdition();
					console.log(await result);
				}}> Mint Edition</button>
				</div>
				<Collection {...userData} />
				<Badges {...userData} />
			</div>
		</div>
	);
};

export default Profile;
