import React from "react";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import CustomButton from "../../buttons/CustomButton/CustomButton";
import ModalNoteContainer from "../../containers/ModalNoteContainer/ModalNoteContainer";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { SnapshotModalProps } from "../../../models/common";

const SnapshotModal = ({ isShowingSnapshotModal, setIsShowingSnapshotModal }: SnapshotModalProps) => {
	const SNAPSHOT_LINK = "https://snapshot.org/#/camb0t.eth/proposal/0x8ce1c311b9a04b5a1232456fa3e958d480325aab0a1b895a113ee916ce1dd5d3";
	const voteState = useSelector((state: RootState) => state.voteModel);
	const submissionsState = useSelector((state: RootState) => state.submissionsModel);
	const { favorites } = voteState;
	const { allSubmissions } = submissionsState;
	const formatSubId = (words: string): string => {
		const splitWords = words.split(" ");
		let first = splitWords[0].toLowerCase();
		let second = splitWords[1]?.toUpperCase();
		return first + second;
	};
	return (
		<ModalWrapper isShowingModal={isShowingSnapshotModal} setIsShowingModal={setIsShowingSnapshotModal}>
			<div
				className={`relative inline-block align-bottom bg-neutral-900 rounded-sm md:px-20 px-5
                    py-6 text-left overflow-hidden shadow-xl transform transition-all 
                    sm:my-8 sm:align-middle max-w-full sm:max-w-lg sm:w-full`}>
				<div className="mx-auto flex items-center justify-center h-11 w-11 rounded-full bg-neutral-700">
					<i className="fa-thin fa-landmark text-neutral-200 my-auto md:text-base"></i>
				</div>
				<h3 className="mb-6 mt-4 text-center text-lg leading-6 text-neutral-200 font-extralight uppercase">VOTE</h3>
				<ModalNoteContainer
					header={"VOTE ON THE TAPE"}
					body={
						<>
							Voting for hedsTAPE 04 will be held via
							{
								<a className="text-blue-400" href={SNAPSHOT_LINK} target={"_blank"}>
									{" "}
									snapshot.org
								</a>
							}
							. Open a seperate window to the snapshot space below.
						</>
					}
					bodyColor={"text-neutral-400"}
				/>
				{favorites && (
					<div className="bg-neutral-800 rounded-md px-4 py-3 text-sm mt-3">
						<h3 className="mt-1 mb-2 text-center bg-neutral-700 rounded-md px-4 py-3 uppercase text-">
							<div className="text-sm text-neutral-300 uppercase">FAVORITES ({favorites.count})</div>
						</h3>
						<div className="flex justify-center flex-col">
							{favorites.favoritesList?.length === 0 ? (
								<h4
									key={"no-favorites"}
									className="bg-neutral-900 text-center text-neutral-500 px-3 py-2 rounded-md my-1 text-xs">
									<div className="flex justify-center my-2">
										<i className="fa-thin fa-heart-circle-xmark text-red-500"></i>
									</div>
									<h3 className="mt-2 text-sm font-medium text-neutral-600 uppercase">No favorites</h3>
								</h4>
							) : (
								favorites.favoritesList?.map((favorite: any) => {
									return (
										<h4
											key={favorite.id + "favoriteID"}
											className="bg-neutral-900 text-neutral-500 px-3 py-2 rounded-md my-1 text-xs">
											<>
												{allSubmissions?.map((el) => {
													if (el.id === favorite.id) {
														return formatSubId(el.subId || "");
													}
												})}
											</>
										</h4>
									);
								})
							)}
						</div>
					</div>
				)}
				<div className="mx-auto my-4 sm:my-8 flex flex-col justify-center items-center">
					<CustomButton
						color={"blue"}
						onClick={() => {
							window.open(SNAPSHOT_LINK, "mywin", "width=700,height=700");
						}}>
						Vote via Snapshot
					</CustomButton>
				</div>
			</div>
		</ModalWrapper>
	);
};
export default SnapshotModal;
