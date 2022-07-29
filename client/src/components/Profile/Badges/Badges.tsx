import React, { Fragment } from "react";
import { UserState } from "../../../models/userModel";
import { classNames } from "../../../utils/classNames";
import { badgeEmptyState } from "../../../utils/emptyStates/badgeEmptyState";


const Badges = (userData: UserState) => {
	return (
		<div className="col-span-12 mt-5">
			<h1 className="col-span-12 text-2xl tracking-widest font-semibold text-neutral-500 px-2.5 mb-2.5 w-full min-w-full lg:text-left text-center">BADGES</h1>
			<div className="grid grid-cols-12 lg:grid-rows-1 gap-y-2 gap-x-2 mx-2 rounded-md bg-neutral-300 dark:bg-neutral-800 p-1.5 place items-start">
				{userData?.badges?.length && (
					<Fragment>
						{badgeEmptyState(userData.badges).map((badge, index) => {
							return (
								<div
									key={badge.name + index}
									className="flex items-center bg-neutral-200 dark:bg-neutral-850 dark:text-neutral-300 text-neutral-900 rounded-md p-2 col-span-12 lg:col-span-3 lg:row-span-1">
									<img src={badge.image} className={classNames(!badge.description && "dark:invert-0 invert", "w-10 h-10 rounded-md border-[0.25px] border-neutral-700 dark:border-neutral-800 ml-0.5")} />
									<div className="flex flex-col items-start justify-end mx-3">
										<span className="font-serif font-extrabold tracking-tight uppercase text-right text-sm">
											{badge.name}
										</span>
										<span className="dark:text-neutral-400 text-neutral-975 text-opacity-80 italic text-xs text-right tracking-wider">
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
