import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useLocation, useHistory } from "react-router";

/**
 * @name AuthWrapper
 * @version 2.0.0
 * @description Serves as a supplement to react router in determination page renders
 * based on user's current authentications status. If authentication changes, it checks
 * if the user is disconnect and on the profile page - this instance triggers a redirect.
 *
 * @param {any} children the modal content to be wrapped.
 */

const AuthWrapper = ({ children }: any) => {
	const { isAuthenticated, isAuthUndefined } = useMoralis();
	const { pathname } = useLocation();
	const history = useHistory();
	useEffect(() => {
		if (!isAuthenticated && !isAuthUndefined && pathname === "/profile") {
			history.push("/");
		}
	}, [isAuthenticated]);
	return <>{isAuthenticated && <>{children}</>}</>;
};

export default AuthWrapper;
