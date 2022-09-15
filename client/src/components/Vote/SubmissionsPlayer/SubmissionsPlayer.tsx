import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Dispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { SubmissionsPlayerProps } from "../../../models/common";

const SubmissionsPlayer = ({ tracks, walletId }: SubmissionsPlayerProps) => {
	const dispatch = useDispatch<Dispatch>();
	const voteState = useSelector((state: RootState) => state.voteModel);
	const { favorites, selectedTrack } = voteState;
	const { space, tape, id } = useParams<{ space: string; tape: string; id: string }>();

	const formatSubId = (words: string): string => {
		const splitWords = words.split(" ");
		let first = splitWords[0]?.toLowerCase();
		let second = splitWords[1]?.toUpperCase();
		return first + second;
	};

	const highlightSubmission = (idx: number): string => {
		if (idx === selectedTrack) {
			return "text-amber-500";
		} else {
			return "text-neutral-600 dark:text-neutral-400";
		}
	};

	useEffect(() => {
		highlightSubmission(0);
	}, [selectedTrack]);

	return (
		<ul role="list" className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
			{tracks?.length &&
				<li className="flex justify-between bg-neutral-200 dark:bg-neutral-900 rounded-md py-1.5 px-2.5 col-span-full w-full">
					<button
						onClick={() => dispatch.voteModel.setSelectedTrack(tracks?.length - 1)}
						style={{ minWidth: "150px" }}
						className={`flex justify-between w-full text-left text-sm font-medium ${highlightSubmission(tracks?.length - 1)}`}>
						<h4>Medasin</h4>
						<i className="fa-regular fa-waveform text-neutral-400 text-sm"></i>
					</button>
				</li>}
				{/* TODO: Rework how we render sample audio */}
			{tracks?.slice(0, tracks?.length - 1).map((sub, idx) => (
				<li key={idx} className={`flex justify-between bg-neutral-200 dark:bg-neutral-900 rounded-md py-1.5 px-1 ${idx === selectedTrack && "border-[0.5px] dark:border-gray-700 border-gray-500"}`}>
					<button
						onClick={() => dispatch.voteModel.setSelectedTrack(idx)}
						style={{ minWidth: "150px" }}
						className={`text-left px-2 text-sm font-medium ${highlightSubmission(idx)}`}>
						{formatSubId(sub.subId)}
					</button>
					<div className="text-sm font-medium text-gray-600 dark:text-gray-500">
						{favorites?.favoritesList?.some((item) => item.id === sub.id) ? (
							<button
								role="button"
								type="button"
								className="w-3/12 text-red-400 border-red-300 px-2 ml-0.5"
								onClick={() => {
									dispatch.voteModel.decreaseFavorites();
									dispatch.voteModel.removeFavorite({
										id: sub.id,
										subId: sub.subId,
										link: sub.link,
										index: idx,
									});
									dispatch.submissionsModel.updateFavorites([
										space || "heds",
										tape,
										id,
										favorites.favoritesList,
										walletId,
									]);
								}}>
								<i className="fa-solid fa-heart"></i>
							</button>
						) : (
							<button
								role="button"
								type="button"
								className="w-3/12 text-red-400 border-red-300 px-2 ml-0.5"
								onClick={() => {
									dispatch.voteModel.increaseFavorites();
									dispatch.voteModel.addFavorite({
										id: sub.id,
										subId: sub.subId,
										link: sub.link,
										index: idx,
									});
									dispatch.submissionsModel.updateFavorites([
										space || "heds",
										tape,
										id,
										favorites.favoritesList,
										walletId,
									]);
								}}>
								<i className="fa-thin fa-heart"></i>
							</button>
						)}
					</div>
				</li>
			))}
		</ul>
	);
};

export default SubmissionsPlayer;
