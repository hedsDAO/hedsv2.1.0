import React, { useEffect } from "react";
import { Dispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useMoralisHooks from "../../hooks/useMoralis";
import AudioPlayer from "../../components/Vote/AudioPlayer/AudioPlayer";
import SubmissionsPlayer from "../../components/Vote/SubmissionsPlayer/SubmissionsPlayer";
import VotingResults from "../../components/Vote/VotingResults/VotingResults";
import VotingFavorites from "../../components/Vote/VotingFavorites/VotingFavorites";
import InfoTooltip from "../../common/tooltip/InfoTooltip/InfoTooltip";
import VoteHeader from "../../components/Vote/VoteHeader/VoteHeader";
import VoteContentContainer from "../../components/Vote/VoteContentContainer/VoteContentContainer";
import VotingButtons from "../../components/Vote/VotingButtons/VotingButtons";

const Vote = () => {
	const history = useHistory();
	const { user, getNFTs } = useMoralisHooks();
	const walletId = user?.attributes.ethAddress;
	const { space, tape, id } = useParams<{ space: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const currentTape = spaceData?.[tape]?.[+id - 1];
	const submissions = useSelector((state: RootState) => state.submissionsModel);
	const voteState = useSelector((state: RootState) => state.voteModel);
	const userData = useSelector((state: RootState) => state.userModel);
	const { voteData, proposalData } = voteState.snapshot;
	const powerMapping = [9, 6, 5, 7, 6];

	useEffect(() => {
		dispatch.spaceModel.getSpaceData("heds");
		dispatch.globalModel.setSpaceTapeId([space, tape, id]);
		dispatch.userModel.getUserData(walletId);
		(async () => await getNFTs())();
		dispatch.voteModel.loadSnapshotSpaceData();
		dispatch.submissionsModel.loadAllSubmissions([space || "heds", tape, id]);
		dispatch.submissionsModel.loadUserFavorties([space || "heds", tape, id, walletId]);
		dispatch.voteModel.setVoteCount(0);
		dispatch.voteModel.setUserVotes({});
	}, []);

	useEffect(() => {
		if (!voteState.votingPower && userData?.collection) {
			dispatch.userModel.setVotingPower({ walletId, collection: userData?.collection, powerMapping });
		}
	}, [userData?.collection]);

	useEffect(() => {
		const { proposalData } = voteState?.snapshot;
		if (proposalData) console.log(proposalData);
	}, [voteState?.snapshot?.proposalData]);
	return (
		<div className="px-3">
			{submissions.allSubmissions?.length && voteData && proposalData && userData && (
				<div className="max-w-7xl mx-auto ">
					<VoteHeader header={"hedsTAPE 05"}>
						<span className="text-sm font-sans text-neutral-500">PUBLIC SUBMISSIONS</span>
					</VoteHeader>
					<VoteContentContainer>
						<AudioPlayer tracks={submissions.allSubmissions} selectedTrack={voteState.selectedTrack} />
						<SubmissionsPlayer walletId={walletId} tracks={submissions.allSubmissions} />
					</VoteContentContainer>
					<hr className="border-neutral-850 my-6 mx-32 border" />
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:w-8/12 mx-1">
							<VoteHeader header={userData.votingPower === 0 ? "FAVORITES" : "VOTE"}>
								<div className="flex items-center">
									<span className="text-sm text-neutral-400 mr-2">voting power</span>
									<span className="text-green-500 mr-2 text-base">
										{userData?.votingPower}
										<span className="text-green-500 fon-thin ml-1">HED</span>
									</span>
									<InfoTooltip infoText="Voting power is calculated by tape ownership. HT1: 9 HT2: 6 HT3: 5 HT4: 7 HT5: 6" />
								</div>
							</VoteHeader>
							<VoteContentContainer>
								<VotingFavorites votingPower={userData?.votingPower} />
							</VoteContentContainer>
							{voteState?.snapshot?.proposalData?.state !== "closed" && (
								<VoteContentContainer className="w-full bg-opacity-0 p-0">
									<VotingButtons votingPower={userData?.votingPower} />
								</VoteContentContainer>
							)}
						</div>
						<div className="w-full md:w-4/12 mx-2 md:mt-0 mt-2">
							<VoteHeader header={"RESULTS"}>
								<div className="flex items-center justify-center text-neutral-400 text-center text-xs bg-neutral-950 py-2 rounded-sm">
									proposal:{" "}
									<a className="text-blue-500 font-serif ml-1" href={currentTape?.links?.snapshot} target="_blank">
										<i className="fa-solid fa-bolt ml-1 mr-1 text-[0.6rem] text-amber-500 text-opacity-70" />
										snapshot.org
									</a>
								</div>
							</VoteHeader>
							<VoteContentContainer className="rounded-sm mb-2">
								<div className="bg-neutral-950 pt-2 pb-4 px-3 rounded-sm">
									<div className="flex justify-between items-center gap-x-4 mb-2 px-1">
										<span className="text-neutral-400 text-sm tracking-tight">subName</span>
										<div>
											<span className="text-green-500 text-xs mb-2.5 tracking-tight mr-2 uppercase">VP earned</span>
											<span className="text-neutral-500 text-xs mb-2.5 tracking-tight uppercase">% of all VP</span>
										</div>
									</div>
									<div className="flex items-center h-4 px-4 text-xs w-5/12 bg-teal-800 rounded-full relative z-30" />
									<div className="flex items-center h-4 px-4 text-xs w-12/12 rounded-full bg-blue-900 relative -mt-4 z-20 " />
									<div className="flex items-center h-4 px-4 font-thin tracking-widest text-xs w-5/12 text-neutral-300 uppercase relative -mt-4 z-30">
										your vote
									</div>
									<div className="flex justify-end h-4 px-4 font-thin tracking-wide text-xs text-neutral-300 uppercase relative -mt-4 z-30 whitespace-nowrap">
										all votes
									</div>
								</div>
							</VoteContentContainer>
							{voteData && proposalData?.id && (
								<VoteContentContainer className="rounded-sm">
									<VotingResults voteData={voteData} proposalData={proposalData} />
								</VoteContentContainer>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Vote;
