import React, { useState, useEffect } from "react";
import axios from "axios";
import { sha256 } from "js-sha256";
import useMoralisHooks from "../../../hooks/useMoralis";
import CustomButton from "../../../common/buttons/CustomButton/CustomButton";
import ReactLoading from "react-loading";
const TWITTER_GETIMAGE_CLOUD_FN = "https://us-central1-heds-34ac0.cloudfunctions.net/twitterGetUserImage/";
const TWITTER_AUTH_CLOUD_FN = "https://us-central1-heds-34ac0.cloudfunctions.net/twitterAuth/";
const VERIFICATION_MESSAGE = "verification for @hedsDAO HDS";

const TwitterAuth = ({ setIsShowingTwitterModal }: any) => {
	const { setUserData, user, refetchUserData } = useMoralisHooks();
	const USER_HASH = sha256(user?.attributes?.ethAddress);
	const [isVerifyingTweet, setIsVerifyingTweet] = useState(false);
	const [userTweetUrl, setUserTweetUrl] = useState<string>();
	const [verified, setVerified] = useState(false);
	const [handle, setHandle] = useState<string>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const HASHED_TWEET = VERIFICATION_MESSAGE + USER_HASH;

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(undefined);
			}, 3000);
		}
		return () => clearTimeout();
	}, [error]);

	const handleConfirm = () => {
		setLoading(true);
		axios
			.get(TWITTER_GETIMAGE_CLOUD_FN + handle)
			.then((response) => {
				const twitterImage = response.data.data[0]?.profile_image_url.split("normal")[0] + "400x400.jpg";
				const usersCurrentNames = user?.attributes?.userDisplayNames;
				const usersCurrentImages = user?.attributes?.userImages;
				usersCurrentNames.push(handle);
				fetch(twitterImage, { method: "HEAD" })
					.then((res) => {
						if (res.status === 404) {
							setUserData({
								userDisplayNames: usersCurrentNames,
								twitterHandle: handle
							});
							setLoading(false);
							refetchUserData();
							setIsShowingTwitterModal(false);
						} else {
							usersCurrentImages.push(twitterImage);
							setUserData({
								userImages: usersCurrentImages,
								userDisplayNames: usersCurrentNames,
								twitterHandle: handle
							});
							setLoading(false);
							refetchUserData();
							setIsShowingTwitterModal(false);
						}
					})
					.catch((err) => {
						console.log(404, usersCurrentNames, usersCurrentImages);
						setError("There was an error getting your account info.");
						console.log("Error:", err);
					});
			})
			.catch(() => {
				setLoading(false);
				setError("There was an issue linking your account.");
			});
	};
	const verifyTweet = () => {
		let linkHolder = [""];
		console.log(userTweetUrl, "user tweet state val");
		if (userTweetUrl?.length) {
			linkHolder = userTweetUrl.split("/");
			const parsedLink = linkHolder[linkHolder.length - 1];
			console.log(parsedLink, "parsed link");
			axios
				.get(TWITTER_AUTH_CLOUD_FN + parsedLink)
				.then((res) => {
					if (res.data.data[0].text.split("HDS")[1] === USER_HASH) {
						setHandle(linkHolder[3]);
						setVerified(true);
					} else {
						setError("Invalid tweet, please try again.");
					}
				})
				.catch(() => {
					setError("There was an issue verifying your account");
				});
		}
	};

	return (
		<>
			{!isVerifyingTweet && !verified && (
				<div className="flex justify-center">
					<CustomButton
						color={"blue"}
						onClick={() => {
							setIsVerifyingTweet(true);
							window.open(`https://twitter.com/intent/tweet?text=${HASHED_TWEET}`, "mywin", "width=700,height=700");
						}}>
						tweet hash
					</CustomButton>
				</div>
			)}
			{isVerifyingTweet && !verified && (
				<>
					<div className="flex w-full mx-auto justify-center">
						<h4 className="text-sm text-center mt-3 mb-4 font-medium uppercase text-neutral-500">Paste tweet url</h4>
					</div>
					{error && (
						<h4 className="text-xs text-center mt-3 mb-4 font-thin uppercase text-red-500">
							<i className="fa-thin fa-circle-exclamation text-red-500 mr-2"></i>
							{error}
						</h4>
					)}
					<input
						type="url"
						name="twitterLink"
						id="twitterLink"
						className="focus:ring-indigo-500 focus:border-indigo-500 rounded-none sm:text-sm border-neutral-100 truncate flex mx-auto w-10/12"
						placeholder="https://twitter.com/you/status/1517702864168099840"
						onChange={(e) => setUserTweetUrl(e.target.value)}
					/>
					<div className="flex justify-center my-3">
						<CustomButton disabled={!userTweetUrl?.length} color={"amber"} onClick={() => verifyTweet()}>
							verify
						</CustomButton>
					</div>
					<h6 className="text-neutral-500 opacity-80 text-center text-sm font-thin mx-32">
						<i className="fa-thin fa-circle-check text-amber-500 opacity-80 mr-2 mt-0.5"></i>you can delete this tweet after
						verifying your account
					</h6>
				</>
			)}
			{verified && (
				<div className="flex justify-center flex-col items-center my-2">
					<div className="flex w-full mx-auto justify-center">
						<h4 className="text-sm text-center mt-3 mb-4 font-medium uppercase text-neutral-500">Confirm and link</h4>
					</div>
					<span className="text-neutral-200 mb-2 mx-auto">
						{user?.attributes.ethAddress.slice(0, 5)} <i className="fa-solid fa-link-horizontal mx-2"></i> @{handle}
					</span>
					<CustomButton disabled={!userTweetUrl?.length} color={"green"} onClick={() => handleConfirm()} className="mt-4 px-8">
						{loading ? (
							<ReactLoading className="w-8 h-8 mx-10" type={"bars"} color={"#089F6E"} height={"32"} width={"32"} />
						) : (
							"confirm"
						)}
					</CustomButton>
				</div>
			)}
		</>
	);
};

export default TwitterAuth;
