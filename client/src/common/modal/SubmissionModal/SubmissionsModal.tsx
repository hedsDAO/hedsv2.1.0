import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store";
import { computeLength } from "../../../utils/computeLength";
import { handlePinataMetadata } from "../../../utils/handlePinataMetadata";
import { generateSubmissionId } from "../../../utils/generateSubmissionId";
import useMoralisHooks from "../../../hooks/useMoralis";
import LoadingIcon from "../../svg/LoadingIcon/LoadingIcon";
import axios from "axios";
const PINATA_IPFS_URL = "https://www.heds.cloud/ipfs/";
const PIN_HASH_TO_IPFS = "https://us-central1-heds-34ac0.cloudfunctions.net/pinHashToIpfs";

const SubmissionModal = () => {
	const { user, uploadFile } = useMoralisHooks();
	const walletId = user?.attributes?.ethAddress;
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch<Dispatch>();
	const [error, setError] = useState<string>();
	// add duration to metadata for subs.
	// @ts-ignore
	const [duration, setDuration] = useState<number>();
	const [submissionSuccess, setSumbissionSuccess] = useState(false);
	const [isResubmitting, setIsResubmitting] = useState<boolean>(false);
	const userData = useSelector((state: RootState) => state.userModel);
	const { space, tape, id } = useSelector((state: RootState) => state.globalModel);
	const { locked, open } = useSelector((state: RootState) => state.globalModel.modal);
	const currentTape = useSelector((state: RootState) => state.spaceModel?.[tape]?.[+id]);
	const submissionsState = useSelector((state: RootState) => state.submissionsModel);
	const { loading, currentSubmission } = submissionsState;
	const submissionData: Array<string> = [currentSubmission, walletId, userData?.twitterHandle, space, tape, id];
	const prevSub = useSelector((state: RootState) => state.submissionsModel?.userSubmissions?.audio?.[space]?.[tape]?.[id] || false);

	useEffect(() => {
		dispatch.submissionsModel.loadUserSubmissions([space, tape, id, walletId]);
		return () => setSumbissionSuccess(false);
	}, []);

	const handleSubmit = async () => {
		dispatch.submissionsModel.setLoading(true);
		const subId = await generateSubmissionId();
		if (userData?.twitterHandle && subId && duration) {
			const options = handlePinataMetadata(walletId, userData.twitterHandle, subId?.data, space, tape, id, duration);
			axios.post(`${PIN_HASH_TO_IPFS}/${currentSubmission}`, options).then((response) => {
				const pinnedHash = response.data.ipfsHash;
				submissionData[0] = PINATA_IPFS_URL + pinnedHash;
				submissionData.push(subId.data);
				dispatch.submissionsModel.handleSubmit(submissionData);
				dispatch.submissionsModel.loadUserSubmissions(walletId);
				dispatch.submissionsModel.setLoading(false);
				setError("");
				setSumbissionSuccess(true);
			});
		}
	};
	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-[60]" onClose={locked || !submissionSuccess ? () => { } : () => dispatch.globalModel.setModalVisibility(false)}>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex bg-neutral-950/90 min-h-full items-center justify-center text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-300"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg align-middle transition-all mt-5">
								<div className="relative z-50 inline-block align-bottom bg-neutral-950 border-[0.25px] border-neutral-700 rounded-lg py-4 px-5 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-md sm:w-full">
									<main className="max-w-lg mx-auto">
										{prevSub && !isResubmitting ? (
											<div className="flex flex-col h-full items-center justify-center py-5">
												<p className="text-sm font-thin text-neutral-400 max-w-[50%] text-center mx-auto">
													You have previously submitted. Do you want to replace the{" "}
													<a target={"_blank"} href={prevSub} className="text-blue-500">
														previous submission
													</a>
													?
												</p>
												<div className="gap-x-2 flex justify-center items-stretch pt-4 mt-5">
													<button
														onClick={() => setIsResubmitting(true)}
														className="px-4 py-1 text-sm bg-green-900 hover:bg-green-800 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
														YES
													</button>
													<button
														onClick={() => dispatch.globalModel.setModalVisibility(false)}
														className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-800 transition-all">
														NO
													</button>
												</div>
											</div>
										) : submissionSuccess ?
											<main className="max-w-lg mx-auto">
												<div className="flex flex-col h-full items-center justify-center py-5 mt-1">
													<p className="text-sm font-semibold text-green-500 mb-4 uppercase tracking-widest">
														<i className="fa-solid fa-circle-check text-green-500 mr-2"></i>
														SUCCESS
													</p>
													<div className="text-neutral-400 uppercase text-xs mb-3">{"Submission recieved."}</div>
													<button
														onClick={() => dispatch.globalModel.setModalVisibility(false)}
														className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-900 transition-all disabled:animate-pulse">
														BACK
													</button>
												</div>
											</main>
											: (
												<Fragment>
													<h5 className="text-base font-semibold text-gray-200 lg:text-xl text-center pt-5 pb-2">
														{currentTape?.tape?.name}
														<span className="uppercase font-normal ml-2 text-neutral-400">Submissions</span>
													</h5>
													<p className="text-sm text-neutral-400 mb-4 max-w-[50%] text-center mx-auto">
														Submit your flip of the sample for a chance to be on the tape.
													</p>
													<div className="mb-2">
														<div className="flex justify-center flex-col gap-y-3">
															<div className="mx-auto self-center mb-12 py-5 max-w-[10rem] max-h-[10rem]">
																<img
																	className="min-h-[10rem] min-w-[10rem] object-cover border-[0.25px] border-neutral-700"
																	src={currentTape?.tape?.image}
																	alt="submission tape image"
																/>
															</div>
															<div className="grid grid-cols-4 items-center bg-neutral-900 p-4 rounded-lg max-w-[95%] mx-auto">
																<div className="col-span-1 text-right pr-9">
																	<i className="fa-solid fa-circle-book-open text-green-500 text-3xl"></i>
																</div>
																<div className="flex flex-col items-start justify-center rounded-lg col-span-3">
																	<h3 className="text-green-500 uppercase text-xs tracking-wide font-semibold">
																		guidelines
																	</h3>
																	<p className="text-xs text-neutral-400 tracking-wide">
																		Submissions must be {currentTape?.sample?.bpm} bpm and between 60 to 90
																		seconds long.
																	</p>
																</div>
															</div>
															<div className="grid grid-cols-4 items-center bg-neutral-900 p-4 rounded-lg mb-4 max-w-[95%] mx-auto">
																<div className="col-span-1 text-right pr-9">
																	<i className="fa-solid fa-circle-exclamation text-amber-500 text-3xl"></i>
																</div>
																<div className="flex flex-col items-start justify-center rounded-lg col-span-3">
																	<h3 className="text-amber-500 uppercase text-xs tracking-tight font-semibold">
																		disclaimer
																	</h3>
																	<p className="text-xs text-neutral-400 tracking-wide">
																		Submissions that do that follow the guidelines can be subject to
																		disqualification.
																	</p>
																</div>
															</div>
															<div className="flex justify-center items-stretch my-2 pt-2">
																<input
																	ref={inputRef}
																	className="text-neutral-300 text-sm uppercase border border-neutral-800 rounded-none focus:outline-none "
																	type="file"
																	onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
																		setError("");
																		const input = e.target as HTMLInputElement;
																		if (input.files) {
																			const validTypes = ["audio/mpeg", "audio/wav"];
																			const fileType = input.files[0].type;
																			const fileSize = input.files[0].size;
																			const { duration } = await computeLength(input.files[0]);
																			if (duration < 60 || duration > 90)
																				return setError("submission length invalid");
																			else if (!validTypes.includes(fileType))
																				return setError("invalid file type");
																			else if (fileSize > 20000000)
																				return setError("max file size exceeded");
																			else {
																				setDuration(duration);
																				await uploadFile(input.files[0]);
																			}
																		}
																	}}
																/>
															</div>
															<small className="mx-auto text-center font-thin my-2 text-neutral-500 pl-2">
																{error ? (
																	<span className="text-red-500 text-sm">{error}</span>
																) : (
																	<div className="flex flex-col items-center justify-center text-sm">
																		<span>{"max: 20mb"}</span>
																		<span className="text-xs">{"(mp3, wav)"}</span>
																	</div>
																)}
															</small>
														</div>
														<div className="gap-x-2 flex justify-center items-stretch pt-4 mt-5 pb-2">
															<button
																onClick={() => handleSubmit()}
																disabled={!currentSubmission}
																className="px-4 py-1 text-sm bg-green-900 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
																{loading ? <LoadingIcon /> : "SUBMIT"}
															</button>
															<button
																disabled={loading}
																onClick={() => dispatch.globalModel.setModalVisibility(false)}
																className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-900 transition-all disabled:animate-pulse">
																CANCEL
															</button>
														</div>
													</div>
												</Fragment>
											)}
									</main>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default SubmissionModal;
