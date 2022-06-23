import React from "react";
import useMoralisHooks from "../../../hooks/useMoralis";
import { Dispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";

const DisplayNameForm = () => {
	const dispatch = useDispatch<Dispatch>();
	const { updateUserProfile, user } = useMoralisHooks();
	const userProfile = useSelector((state: RootState) => state.userModel?.userProfile);
	const { currentDisplayName, userDisplayNames } = userProfile;
	const handleWalletString = (name: string) => {
		if (name.includes("0x")) {
			let parsedName = name.slice(0, 5);
			return parsedName;
		} else return name;
	};
	return (
		<div className="mb-10">
			<h3 className="uppercase font-extralight text-neutral-300">Display Name</h3>
			<p className="text-neutral-500 text-xs mb-2">
				Choose a public name to display on the platform. Verify your account for additional names.
			</p>
			<div className="flex flex-col  items-start mt-3">
				{userDisplayNames?.map((name: any, i: any) => {
					if (userDisplayNames[currentDisplayName] === name) {
						return (
							<button
								key={name}
								disabled
								className="my-1 mr-1 px-4 py-1.5 text-sm rounded-sm text-neutral-200 bg-neutral-900 opacity-80 border-2 border-green-500">
								{handleWalletString(name)}
							</button>
						);
					} else {
						return (
							<button
								key={name}
								onClick={() => {
									updateUserProfile("currentDisplayName", i);
									dispatch.userModel.loadUserProfile(user);
								}}
								className="my-1 mr-1 px-4 py-1.5 text-sm rounded-sm text-neutral-600 border-neutral-700 transition-all border-2 bg-neutral-900 hover:border-green-500">
								{handleWalletString(name)}
							</button>
						);
					}
				})}
			</div>
		</div>
	);
};
export default DisplayNameForm;
