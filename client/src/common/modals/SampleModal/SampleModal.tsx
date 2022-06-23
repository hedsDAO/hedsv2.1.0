import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { ModalProps, TapeStatus } from "../../../models/common";
import { RootState } from "../../../store";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import CustomButton from "../../buttons/CustomButton/CustomButton";
import ModalNoteContainer from "../../containers/ModalNoteContainer/ModalNoteContainer";

const SampleModal = ({ isShowingModal, setIsShowingModal }: ModalProps) => {
	const { id } = useParams<{ id: string }>();
	const storage = getStorage();
	const sampleRef = ref(storage, `public/samples/ht${id}.mp3`);
	const [sampleDownloadUrl, setSampleDownloadUrl] = useState<string>();
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const currentTapeData = globalTapesData?.hedstapes?.[parseInt(id) - 1];
	const bpm = currentTapeData?.sample?.bpm;
	const rules = ["Use at least 1 second of sample", `Must be at ${bpm} bpm`, "at least 1 min in length"];
	const ruleStyle = "py-2 text-neutral-400 uppercase text-sm sm:text-base font-extralight";
	const disclaimer = "Submissions that do not follow these guidelines may be subject to disqualification.";
	useEffect(() => {
		getDownloadURL(sampleRef).then((url: string) => {
			setSampleDownloadUrl(url);
		});
	}, []);

	return (
		<ModalWrapper isShowingModal={isShowingModal} setIsShowingModal={setIsShowingModal}>
			<div className="relative inline-block align-bottom bg-neutral-900 rounded-sm py-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-700">
					<i className="fa-thin fa-waveform text-neutral-200 my-auto" />
				</div>
				<h3 className="mb-8 text-2xl text-center leading-6 text-neutral-200 font-extralight uppercase mt-3 sm:mt-5">the sample</h3>
				{currentTapeData?.status === TapeStatus.SAMPLE_OPEN ? (
					<div className="px-5 sm:px-10">
						<ModalNoteContainer header={"BEFORE YOU FLIP"} body={disclaimer} />
						<ul className="flex justify-center flex-col items-center text-center py-8">
							{rules.map((rule) => (
								<li key={rule} className={ruleStyle}>
									{rule}
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className="px-5 sm:px-10 py-6 text-center text-neutral-400">
						<span className="text-3xl text-red-500 mr-1">{bpm}</span>BPM
					</div>
				)}
				<div className="mt-8 mb-4 sm:mt-5 sm:mb-3 flex justify-center">
					<CustomButton onClick={() => setIsShowingModal(false)} color={"neutral"} className={"group mx-1"}>
						<i className="fa-thin fa-arrow-left mr-2 pt-0.5 group-hover:pr-4 transition-all"></i> Back
					</CustomButton>
					{sampleDownloadUrl && (
						<CustomButton
							onClick={() => handleDownloadFile(sampleDownloadUrl, `HT${id}`)}
							color={"green"}
							className={"group mx-1"}>
							Download
						</CustomButton>
					)}
				</div>
			</div>
		</ModalWrapper>
	);
};
export default SampleModal;
