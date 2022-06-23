import React from "react";
import { formatSubId } from "../../utils/formatSubId";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store";
import { PublicSubmission } from "../../models/common";

const VotingFavorites = ({ votingPower }: { votingPower: number }) => {
	const dispatch = useDispatch<Dispatch>();
	const voteState = useSelector((state: RootState) => state.voteModel);
	const proposalIndex = voteState.snapshot.proposalIndex;
	const userVotes = voteState.snapshot.userVotes[proposalIndex];
	const voteCount = voteState.snapshot.voteCount[proposalIndex];

	const handleDecreaseVote = (newVoteCount: number, favorite: PublicSubmission) => {
		const updatedVote = { ...userVotes };
		if (favorite.index + 1 in updatedVote && updatedVote[favorite.index + 1] > 0) {
			updatedVote[favorite.index + 1]--;
			dispatch.voteModel.setVoteCount(newVoteCount);
			dispatch.voteModel.setUserVotes(updatedVote);
		}
	};

	const handleIncreaseVote = (newVoteCount: number, favorite: PublicSubmission) => {
		const updatedVote = { ...userVotes };
		if (favorite.index + 1 in updatedVote) {
			updatedVote[favorite.index + 1]++;
		} else updatedVote[favorite.index + 1] = 1;
		dispatch.voteModel.setVoteCount(newVoteCount);
		dispatch.voteModel.setUserVotes(updatedVote);
	};

	const calculateVotePercentage = (index: number) => {
		if (userVotes[index] > 0) {
			return Number(((userVotes[index] / voteCount) * 100).toFixed(2));
		} else return 0;
	};

	return (
		<>
			{voteState?.favorites?.favoritesList?.length ? (
				<ul role="list" className="flex flex-col -my-1">
					{voteState?.favorites?.favoritesList.map((favorite) => {
						return (
							<div key={favorite.subId} className="flex justify-between bg-neutral-950 py-2 px-1 text-neutral-400 my-1">
								<button
									onClick={() => dispatch.voteModel.setSelectedTrack(favorite.index)}
									style={{ minWidth: "150px" }}
									className={`text-left px-2 text-sm font-medium`}>
									{formatSubId(favorite.subId)}
								</button>
								{votingPower > 0 && (
									<div className="flex justify-between items-center text-sm font-medium text-gray-500 px-2">
										<div className="mr-3 flex gap-x-2 px-2">
											<button
												role="button"
												type="button"
												className="text-neutral-400 border-neutral-300"
												onClick={() => handleDecreaseVote(voteCount - 1, favorite)}>
												<i className="fa-thin fa-minus"></i>
											</button>
											<span className="text-neutral-300 min-w-[2ch] max-w-[2ch] text-center">
												{userVotes[favorite.index + 1] || 0}
											</span>
											<button
												role="button"
												type="button"
												className="text-neutral-400 border-neutral-300"
												onClick={() => handleIncreaseVote(voteCount + 1, favorite)}>
												<i className="fa-thin fa-plus"></i>
											</button>
										</div>
										<div className="min-w-[6ch] max-w-[6ch] text-right px-1">
											<span className="text-neutral-300">{calculateVotePercentage(favorite.index + 1)}%</span>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</ul>
			) : (
				<div className="bg-neutral-850 flex text-red-500 text-opacity-70">
					<div className="bg-neutral-950 text-center text-sm w-full py-3">[no favorites]</div>
				</div>
			)}
		</>
	);
};

export default VotingFavorites;
