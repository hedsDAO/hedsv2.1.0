// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import TokenBurnModal from "../../modal/TokenBurnModal/TokenBurnModal";
import { whitelist, tokenMapping } from "../../../data/whitelists/tokenBurnWhitelist";

/**
 * @name OGsWrapper
 * @version 2.0.0
 * @description handling genhead token burn for og status.
 *
 * @param {any} children the modal content to be wrapped.
 */

const OGsWrapper = ({ children }: any) => {
	// const [isShowingTokenBurnModal, setIsShowingTokenBurnModal] = useState(false);
	const { isAuthenticated, user, isAuthenticating } = useMoralis();

	useEffect(() => {
		if (user && isAuthenticated) {
			let ethAddress = user?.attributes?.ethAddress;
			// let badges = user?.attributes?.badges;
			if (whitelist.includes(ethAddress)) {
				console.log("is on whitelist");
				// setIsShowingTokenBurnModal(true);
			}
		}
	}, [user, isAuthenticating]);
	return (
		<>
			<TokenBurnModal
			// isShowingTokenBurnModal={isShowingTokenBurnModal}
			// setIsShowingTokenBurnModal={setIsShowingTokenBurnModal}
			// user={user}
			// tokenMapping={tokenMapping}
			/>
			{children}
		</>
	);
};

export default OGsWrapper;
