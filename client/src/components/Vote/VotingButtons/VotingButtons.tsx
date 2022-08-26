import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";
import useMoralisHooks from "../../../hooks/useMoralis";
import { Dispatch, RootState } from "../../../store";
import ReactLoading from "react-loading";
import { ghostLoader } from "../../../utils/ghostLoader";

const VotingButtons = ({ votingPower }: { votingPower: number }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { user } = useMoralisHooks();
	const { web3, enableWeb3, isWeb3EnableLoading } = useMoralis();
	const walletId = user?.attributes.ethAddress;
	const dispatch = useDispatch<Dispatch>();
	const voteState = useSelector((state: RootState) => state.voteModel);
	const proposalIndex = voteState.snapshot.proposalIndex;
	const userVotes = voteState.snapshot.userVotes[proposalIndex];
	const voteCount = voteState.snapshot.voteCount[proposalIndex];
	const voteData = voteState.snapshot.voteData;
	const hasUserVoted = () => voteData?.filter((vote: any) => vote.voter.toLowerCase() === user?.attributes?.ethAddress).length;
	//@ts-ignore
	const castVote = () => web3 && dispatch.voteModel.castVote([web3, userVotes, ethers.utils.getAddress(walletId)]);

	const getWeb3Provider = async () => {
		await enableWeb3();
		ghostLoader(setIsLoading, 1000);
	};

	return (
		<div className="flex justify-center items-center py-2 rounded-sm">
			{votingPower !== 0 && (
				<>
					{!web3 ? (
						<button
							disabled={isWeb3EnableLoading}
							onClick={() => getWeb3Provider()}
							className={`px-5 py-1 bg-green-800 text-sm hover:bg-green-900 text-green-100 dark:border-green-800 bg-opacity-70 tracking-widest dark:border-2 uppercase rounded-full transition-all`}>
							{isLoading ? (
								<ReactLoading className="w-5 h-5 mx-7" type={"bars"} color={"#089F6E"} height={"16"} width={"16"} />
							) : (
								"authenticate"
							)}
						</button>
					) : (
						<button
							disabled={voteCount === 0}
							onClick={() => castVote()}
							className={`px-5 py-1.5 ${voteCount === 0
								? "bg-neutral-700 text-neutral-400 border-neutral-800"
								: "bg-green-800 hover:bg-green-900 text-green-200 border-green-800"
								} bg-opacity-70 font-thin tracking-widest  text-sm border-2 uppercase rounded-full transition-all`}>
							{ }
							{voteState.isLoading ? (
								<ReactLoading className="w-5 h-5 mx-7" type={"bars"} color={"#089F6E"} height={"16"} width={"16"} />
							) : hasUserVoted() ? (
								"update vote"
							) : (
								"cast vote"
							)}
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default VotingButtons;
