// @ts-nocheck
import React, { useEffect, useState, Fragment } from "react";
import { useMoralis } from "react-moralis";
import TokenBurnModal from "../../modal/TokenBurnModal/TokenBurnModal";
import { whitelist, tokenMapping } from "../../../data/whitelists/tokenBurnWhitelist";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store";
import { Modals } from "../../../models/globalModel";

/**
 * @name OGsWrapper
 * @version 2.0.0
 * @description handling genhead token burn for og status.
 * @param {any} children the modal content to be wrapped.
 */

const OGsWrapper = ({ children }: any) => {
	const dispatch = useDispatch<Dispatch>();
	const { isAuthenticated, user, isAuthenticating } = useMoralis();

	useEffect(() => {
		if (user && isAuthenticated) {
			let ethAddress = user?.attributes?.ethAddress;
			if (whitelist.includes(ethAddress)) {
				// todo: activate popup token burn modal
				// dispatch.globalModel?.setModal({ modal: Modals.OGHED, open: true, locked: true });
			}
		}
	}, [user, isAuthenticating]);
	return <Fragment>{children}</Fragment>;
};

export default OGsWrapper;
