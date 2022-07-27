import React, { Fragment } from "react";
import { UserState } from "../../../models/userModel";
import { badgeEmptyState } from "../../../utils/emptyStates/badgeEmptyState";

const Badges = (userData: UserState) => {
	return (
		<div className="col-span-12 mt-5">
			<h1 className="col-span-12 text-2xl tracking-widest font-semibold text-neutral-500 px-2.5 mb-2">BADGES</h1>
			<div className="grid grid-cols-12 lg:grid-rows-1 gap-y-1 gap-x-1 mx-2 rounded-md bg-neutral-600 dark:bg-neutral-900 p-1">
				{userData?.badges?.length && (
					<Fragment>
						{badgeEmptyState(userData.badges).map((badge, index: number) => {
							if (badge?.image?.length) {
								return (
									<div
										key={badge.name}
										className="flex items-center justify-start w-full bg-neutral-500 dark:bg-neutral-400 text-neutral-900 rounded-md p-2 col-span-12 lg:col-span-3 lg:row-span-1">
										<img src={badge.image} className="w-10 h-10 rounded-lg border-[0.25px] border-neutral-950" />
										<div className="flex flex-col items-start justify-end mx-3">
											<span className="font-serif font-extrabold tracking-tight uppercase text-right text-sm">
												{badge.name}
											</span>
											<span className="text-neutral-975 text-opacity-80 italic text-xs text-right tracking-wider">
												{badge.description}
											</span>
										</div>
									</div>
								);
							} else
								return (
									<div
										key={index + "emptyBadge"}
										className="hidden lg:flex items-center justify-start w-full bg-neutral-400 dark:bg-neutral-850 text-neutral-500 rounded-md p-2 col-span-6 lg:col-span-3 lg:row-span-1">
										<div className="flex flex-col items-start justify-end mx-3">
											<span className="font-serif font-extrabold tracking-tight uppercase text-right text-sm">
												{badge.name}
											</span>
											<span className="text-neutral-800 text-opacity-80 italic text-xs text-right tracking-wider">
												{badge.description}
											</span>
										</div>
									</div>
								);
						})}
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Badges;
