import React from "react";
import handleWalletString from "../../utils/handleWalletString";

const ProfileNamesContainer = ({ displayName, ethAddress }: any) => {
	return (
		<div className="flex items-baseline px-2 py-3">
			<div className="sm:flex items-baseline justify-center min-w-0 flex-1 mb-2">
				<h1 className="text-3xl text-white truncate">
					{handleWalletString(displayName)}
					{ethAddress && (
						<>
							<span className="text-sm uppercase font-extralight text-neutral-400 truncate ml-1 ">{ethAddress}</span>
						</>
					)}
				</h1>
			</div>
		</div>
	);
};
export default ProfileNamesContainer;
