import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Dispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import ReactLoading from "react-loading";
import ModalWrapper from "../../wrappers/ModalWrapper/ModalWrapper";
import useMoralisHooks from "../../../hooks/useMoralis";
import AudioFileUploader from "../../../components/AudioFileUploader/AudioFileUploader";
import ModalNoteContainer from "../../containers/ModalNoteContainer/ModalNoteContainer";
import CustomButton from "../../buttons/CustomButton/CustomButton";
import { SubmissionModalProps } from "../../../models/common";
import { generateSubmissionId } from "../../../utils/generateSubmissionId";
import { handlePinataMetadata } from "../../../utils/handlePinataMetadata";

const IPFS_URL = "https://ipfs.io/ipfs/";
const PINATA_IPFS_URL = "https://www.heds.cloud/ipfs/";
const PIN_HASH_TO_IPFS = "https://us-central1-heds-34ac0.cloudfunctions.net/pinHashToIpfs";

const SubmissionModal = ({ isShowingSubmissionsModal, setIsShowingSubmissionsModal }: SubmissionModalProps) => {
	const { space, tape, id } = useParams<{ space: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const [file, setFile] = useState<File | null>();
	const [didSubmit, setDidSubmit] = useState<boolean>(false);
	const submissionsState = useSelector((state: RootState) => state.submissionsModel);
	const { loading, currentSubmission, userSubmissions } = submissionsState;
	const { user } = useMoralisHooks();
	const walletId = user?.attributes?.ethAddress;
	const displayName = user?.attributes?.twitterHandle;
	const submissionData: Array<string> = [currentSubmission, walletId, displayName, space || "heds", tape, id];
	const previousSubmission = userSubmissions?.audio?.[space || "heds"]?.[tape]?.[id] || false;

	useEffect(() => {
		dispatch.submissionsModel.loadUserSubmissions([space || "heds", tape, id, walletId]);
	}, []);

	const presubmitCheck = async () => {
		if (submissionData.length === 6) {
			const submissionId = await generateSubmissionId();
			if (submissionId) handleSubmit(submissionId);
		}
	};
	const handleSubmit = async (submissionId: AxiosResponse<any>) => {
		dispatch.submissionsModel.setLoading(true);
		const options = handlePinataMetadata(walletId, displayName, submissionId?.data, space, tape, id);
		axios.post(`${PIN_HASH_TO_IPFS}/${currentSubmission}`, options).then((response) => {
			const pinnedHash = response.data.ipfsHash;
			submissionData[0] = PINATA_IPFS_URL + pinnedHash;
			submissionData.push(submissionId.data);
			dispatch.submissionsModel.handleSubmit(submissionData);
			dispatch.submissionsModel.loadUserSubmissions(walletId);
			setTimeout(() => dispatch.submissionsModel.setLoading(false), 1200);
			setFile(null);
			setDidSubmit(true);
		});
	};
	return (
		<ModalWrapper isShowingModal={isShowingSubmissionsModal} setIsShowingModal={setIsShowingSubmissionsModal}>
			<div className="relative inline-block align-bottom bg-neutral-900 rounded-sm py-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
				<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-neutral-700">
					<i className="fa-thin fa-upload text-neutral-200 my-auto" />
				</div>
				<h3 className="mb-8 text-2xl text-center leading-6 text-neutral-200 font-extralight uppercase mt-3 sm:mt-5">SUBMIT</h3>
				<div className="px-5 sm:px-10">
					<div className="mt-3 sm:mt-5">
						{!file && (previousSubmission || didSubmit) && (
							<ModalNoteContainer
								header={"SUBMISSION RECIEVED"}
								headerColor={"text-green-500"}
								bodyColor={"text-green-500"}
								body={"Submit again only if you wish to update and replace your previous submission."}>
								<a target="_blank" href={didSubmit ? PINATA_IPFS_URL + currentSubmission : previousSubmission}>
									<i className="fa-thin fa-waveform" />
								</a>
								<span className="text-xs text-neutral-500 font-thin">listen to your track</span>
							</ModalNoteContainer>
						)}
					</div>
					{currentSubmission && !didSubmit && (
						<div className="my-6 mx-auto flex items-center flex-col">
							<h6 className="mb-2 text-lg text-center font-extralight uppercase text-amber-500">
								<i className="fa-thin fa-circle-exclamation text-amber-500 mr-2"></i>
								{"PREVIEW & SUBMIT"}
							</h6>
							<a
								className="font-extralight text-sm uppercase text-blue-500 mb-3"
								target="_blank"
								href={IPFS_URL + currentSubmission}>
								<i className="fa-thin fa-link-horizontal mr-2 text-neutral-200"></i>your submission
							</a>
							<p className="text-neutral-500 font-thin text-center text-sm mb-4 px-10">
								Preview your track to confirm and <span className="text-amber-500">submit your track </span> for a chance to
								be on the next tape!
							</p>
						</div>
					)}
					{!currentSubmission && <AudioFileUploader file={file} setFile={setFile} />}
					<div className="mt-8 mb-12 sm:mb-8 flex justify-center">
						<CustomButton onClick={() => setIsShowingSubmissionsModal(false)} color={"neutral"} className={"group mx-1"}>
							<i className="fa-thin fa-arrow-left mr-2 pt-0.5 group-hover:pr-4 transition-all"></i> Back
						</CustomButton>
						{currentSubmission && !didSubmit && (
							<CustomButton onClick={() => presubmitCheck()} color={"green"} className={"group mx-1"}>
								{loading ? (
									<ReactLoading className="w-4 h-4 mx-2" type={"bars"} color={"green"} height={"16"} width={"16"} />
								) : (
									<span className="px-3">submit</span>
								)}
							</CustomButton>
						)}
					</div>
				</div>
			</div>
		</ModalWrapper>
	);
};
export default SubmissionModal;
