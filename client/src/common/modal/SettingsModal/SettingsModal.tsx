import React, { Fragment, useRef, useState } from "react";
import { Dispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "@heroicons/react/solid";
import useMoralisHooks from "../../../hooks/useMoralis";
import defaultImg from "/public/images/default.png";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Dialog, Transition } from "@headlessui/react";
import { getCurrentImagePath } from "../../../utils/getCurrentImagePath";
import LoadingIcon from "../../svg/LoadingIcon/LoadingIcon";

const SettingsModal = () => {
	const storage = getStorage();
	const dispatch = useDispatch<Dispatch>();
	const inputRef = useRef<HTMLInputElement>(null);
	const userData = useSelector((state: RootState) => state.userModel);
	const { open, locked } = useSelector((state: RootState) => state.globalModel.modal);
	const { user } = useMoralisHooks();
	const [file, setFile] = useState<File | void>();
	const [fileType, setFileType] = useState<string | void>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const [preview, setPreview] = useState<string | void>();
	const [chars, setChars] = useState<number>(0 + userData?.description?.length);
	const [description, setDescription] = useState();

	const handleSubmit = async () => {
		setLoading(true);
		const wallet = user?.attributes?.ethAddress;
		if (preview && !file) dispatch.userModel.updateProfilePicture([wallet, ""]);
		else if (fileType && file) {
			if (userData?.profilePicture) {
				const currentImagePath = getCurrentImagePath(userData.profilePicture, wallet);
				const currentImageRef = ref(storage, "users/" + currentImagePath);
				deleteObject(currentImageRef);
			} 
			const storageRef = ref(storage, "users/" + wallet + fileType);
			uploadBytes(storageRef, file).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((downloadURL) => {
					dispatch.userModel.updateProfilePicture([wallet, downloadURL]);
					setLoading(false);
					dispatch.globalModel.setModalVisibility(false);
				});
			});
		}
		else if (description) {
			dispatch.userModel.updateDescription([wallet, description]);
			dispatch.globalModel.setModalVisibility(false);
		} else setLoading(false);
	};


	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-[60]" onClose={locked ? () => { } : () => dispatch.globalModel.setModalVisibility(false)}>
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
										<h5 className="mb-2 uppercase text-base font-semibold text-gray-200 lg:text-xl">
											PROFILE SETTINGS
										</h5>
										<p className="text-sm font-normal text-gray-400 mb-4">Edit your profile details.</p>
										<div className="space-y-6 mb-4">
											<div className="mt-5 flex justify-center flex-col">
												<div className="mx-auto self-center my-4 py-5 max-w-[10rem] max-h-[10rem]">
													<img
														className="rounded-full min-h-[10rem] min-w-[10rem] object-cover border-[0.25px] border-neutral-700"
														src={preview || userData?.profilePicture || defaultImg}
														alt=""
													/>
												</div>
												<div className="flex justify-center items-stretch my-2 pt-10">
													<input
														ref={inputRef}
														className="text-neutral-300 text-sm uppercase border border-neutral-800 rounded-none focus:outline-none"
														type="file"
														onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
															const input = e.target as HTMLInputElement;
															if (input.files) {
																const fileType = input.files[0].type;
																const fileSize = input.files[0].size;
																if (
																	fileType !== "image/png" &&
																	fileType !== "image/jpg" &&
																	fileType !== "image/jpeg"
																) {
																	setError("please upload a .wav or .mp3 file");
																} else if (fileSize > 10000000) {
																	setError("max file size exceeded");
																} else {
																	setFileType("." + input.files[0].type.split('/')[1])
																	setPreview(URL.createObjectURL(input.files[0]));
																	setFile(input.files[0]);
																	setError("");
																}
															}
														}}
													/>
													<button
														onClick={() => {
															if (inputRef.current) {
																inputRef.current.value = "";
																setPreview(defaultImg);
																setFile();
															}
														}}
														className="px-4 text-sm border-2 border-neutral-800 bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none ml-1">
														<TrashIcon className="w-3 h-3" />
													</button>
												</div>
												<small className="mx-auto text-center font-thin my-2 text-neutral-500 pl-2">
													{error ? (
														<span className="text-red-500">{error}</span>
													) : (
														<div className="flex flex-col items-center justify-center">
															<span>{"max: 10mb"}</span>
															<span>{"(png, jpg, jpeg)"}</span>
														</div>
													)}
												</small>
											</div>
											{/* <div className="flex items-center justify-center mx-8">
												<h5 className="text-neutral-400 uppercase text-xs font-semibold">THEME:</h5>
												<DarkModeToggle />
											</div> */}
											<div className="mb-7 pt-2 mx-10">
												<label
													htmlFor="description"
													className="text-neutral-400 uppercase text-xs font-semibold pb-1">
													description
												</label>
												<div className="mt-1.5">
													<textarea
														id="description"
														name="description"
														rows={3}
														maxLength={130}
														className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-sm border border-neutral-700 bg-neutral-900 text-neutral-200"
														onChange={(e: any) => {
															setChars(e.target.value.length);
															setDescription(e.target.value);
														}}
														defaultValue={userData.description}
													/>
													<span className="text-xs mt-1 text-neutral-600">
														characters remaining:{" "}
														<span className={chars < 130 ? "text-neutral-400" : "text-red-500"}>
															{130 - chars}
														</span>
													</span>
												</div>
											</div>

											<div className="gap-x-2 flex justify-center items-stretch pt-4">
												<button
													onClick={() => dispatch.globalModel.setModalVisibility(false)}
													className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-900 transition-all">
													CANCEL
												</button>
												<button
													onClick={handleSubmit}
													disabled={preview ? false : description ? false : true}
													className="px-4 py-1 text-sm bg-green-900 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
													{loading ? <LoadingIcon /> : "UPDATE"}
												</button>
											</div>
										</div>
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
export default SettingsModal;
