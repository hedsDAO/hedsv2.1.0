import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import useMoralisHooks from "../../../hooks/useMoralis";
import { Dispatch, RootState } from "../../../store";
import { sha256 } from "js-sha256";
import axios from "axios";
import LoadingIcon from "../../svg/LoadingIcon/LoadingIcon";
import { XIcon } from "@heroicons/react/solid";

const TWITTER_AUTH_CLOUD_FN = "https://us-central1-heds-34ac0.cloudfunctions.net/twitterAuth/";
const VERIFICATION_MESSAGE = "verification for @hedsDAO HDS";

enum TwitterStep {
	NOT_VERIFIED = 0,
	VERIFYING,
	LINKING,
	COMPLETE,
	ERROR,
}

const TwitterModal = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [tweetUrl, setTweetUrl] = useState<string>();
	const [handle, setHandle] = useState<string>();
	const [step, setStep] = useState<TwitterStep>(0);
	const { user } = useMoralisHooks();
	const dispatch = useDispatch<Dispatch>();
	const globalData = useSelector((state: RootState) => state.globalModel);
	const USER_HASH = sha256(user?.attributes?.ethAddress);
	const HASHED_TWEET = VERIFICATION_MESSAGE + USER_HASH;
	const winTank = [`https://twitter.com/intent/tweet?text=${HASHED_TWEET}`, "mywin", "width=700,height=700"];

	const verifyTweet = (userTweetUrl: string | void) => {
		setLoading(true);
		if (userTweetUrl?.length) {
			let urlTank = [""];
			urlTank = userTweetUrl.split("/");
			let parsedLink = urlTank[urlTank.length - 1];
			parsedLink = parsedLink.slice(0, 19);
			console.log(parsedLink, 'parsed')
			axios
				.get(TWITTER_AUTH_CLOUD_FN + parsedLink)
				.then((res) => {
					if (res.data.data[0].text.split("HDS")[1] === USER_HASH) {
						setHandle(urlTank[3]);
						setLoading(false);
						setStep(TwitterStep.LINKING);
					} else {
						setStep(TwitterStep.ERROR);
						setLoading(false);
					}
				})
				.catch(() => {
					setStep(TwitterStep.ERROR);
					setLoading(false);
				});
		}
	};

	const linkAccount = () => {
		setLoading(true);
		if (handle) {
			(() =>
				setTimeout(() => {
					setLoading(false);
					setStep(TwitterStep.COMPLETE);
					dispatch.userModel.updateTwitterHandle([user?.attributes?.ethAddress, handle]);
					dispatch.globalModel.clearModalState();
				}, 1000))();
		} else setStep(TwitterStep.ERROR);
	};
	return (
		<Transition appear show={globalData?.modal?.open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={globalData?.modal?.locked ? () => { } : () => dispatch.globalModel.setModalVisibility(false)}>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex bg-neutral-950/95 min-h-full items-center justify-center text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-neutral-950 text-left align-middle shadow-xl transition-all mt-5">
								<main className="max-w-lg mx-auto">
									{step === TwitterStep.ERROR && (
										<button
											className="w-full py-1 bg-red-500 text-neutral-100"
											onClick={() => setStep(TwitterStep.NOT_VERIFIED)}>
											something went wrong...
										</button>
									)}
									{step === TwitterStep.NOT_VERIFIED && (
										<div className="inline-flex items-stretch w-full">
											<button
												className="w-11/12 py-1 bg-blue-500 text-neutral-100"
												onClick={() => {
													window.open(winTank[0], winTank[1], winTank[2]);
													setStep(TwitterStep.VERIFYING);
												}}>
												tweet hash
											</button>
											<button
												className="w-1/12 py-1 bg-neutral-850 text-red-200 hover:text-red-300 inline-flex text-center justify-center items-center text-sm px-2 gap-x-2 transition-all"
												onClick={() => dispatch.globalModel.setModalVisibility(false)}>
												<XIcon className="h-4 w-4" />
											</button>
										</div>
									)}
									{step === TwitterStep.VERIFYING && (
										<div className="flex justify-center items-stretch">
											<input
												type="url"
												name="twitterLink"
												id="twitterLink"
												className="focus:ring-indigo-500 focus:border-indigo-500 rounded-none sm:text-sm border-neutral-100 truncate flex mx-auto w-8/12"
												placeholder="https://twitter.com/you/status/1517702864168099840"
												onChange={(e) => {
													setTweetUrl(e.target.value);
												}}
											/>
											<button
												disabled={!tweetUrl}
												className="w-3/12 bg-blue-500 text-neutral-100 disabled:bg-neutral-500 text-xs"
												onClick={() => verifyTweet(tweetUrl)}>
												{loading ? <LoadingIcon /> : tweetUrl ? "link account" : "paste tweet url"}
											</button>
											<button
												className="w-1/12 py-1 bg-neutral-800 text-red-400 hover:text-red-500 inline-flex text-center justify-center items-center text-sm px-2 gap-x-2 transition-all"
												onClick={() => dispatch.globalModel.setModalVisibility(false)}>
												<XIcon className="h-4 w-4" />
											</button>
										</div>
									)}
									{step === TwitterStep.LINKING && (
										<div className="inline-flex items-stretch w-full">
											<div className="w-4/5 py-1 bg-neutral-700 text-neutral-100 inline-flex items-center justify-center text-sm px-2 gap-x-2 text-center">
												{user?.attributes?.ethAddress.slice(0, 5) + "..."}{" "}
												<i className="fa-solid fa-link text-neutral-400" /> {handle}
											</div>
											<button
												className="w-1/5 py-1 bg-green-500 text-neutral-100 inline-flex text-center justify-center items-center text-sm px-2 gap-x-2"
												onClick={() => linkAccount()}>
												{loading ? <LoadingIcon /> : "confirm"}
											</button>
										</div>
									)}
								</main>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
export default TwitterModal;
