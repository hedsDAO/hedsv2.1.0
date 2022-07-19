import React, { useEffect, Fragment } from "react";
import { useMoralis } from "react-moralis";
import { useLocation } from "react-router";
import { whitelist } from "../../../data/whitelists/tokenBurnWhitelist";
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
	const { pathname } = useLocation<{ pathname: string }>();
	const dispatch = useDispatch<Dispatch>();
	const { isAuthenticated, user, isAuthenticating } = useMoralis();

	useEffect(() => {
		if (user && isAuthenticated) {
			let ethAddress = user?.attributes?.ethAddress;
			if (whitelist.includes(ethAddress)) {
				if (pathname === "/profile") dispatch.globalModel?.setModal({ modal: Modals.OGHED, open: true, locked: true });
			}
		}
	}, [user, isAuthenticating, pathname]);
	return <Fragment>{children}</Fragment>;
};

export default OGsWrapper;
