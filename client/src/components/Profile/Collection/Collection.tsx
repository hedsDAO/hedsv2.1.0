import React, { Fragment } from "react";
import { CollectionItem } from "../../../models/common";
import { Link } from "react-router-dom";
import { UserState } from "../../../models/userModel";
import { collectionEmptyStates } from "../../../utils/emptyStates/collectionEmptyState";

const Collection = (userData: UserState) => {
	return (
		<Fragment>
			{Object.values(userData?.collection)?.length ? <div className="col-span-12 lg:col-span-auto mt-5">
				{Object.values(userData?.collection)?.length ? (
					<h1 className="col-span-12 text-2xl tracking-widest font-semibold dark:text-neutral-400 text-neutral-500 px-2.5 mb-2 w-full min-w-full lg:text-left text-center">COLLECTION</h1>
				) : null}
				<div className="grid grid-cols-2 xl:grid-cols-7 place-items-center items-center gap-y-2 gap-x-2 bg-neutral-300 dark:bg-neutral-800 p-2 rounded-md mx-2">
					{Object.values(userData?.collection)?.length
						&& collectionEmptyStates(Object.values(userData?.collection)).map((tape: CollectionItem, index: number) => {
							if (tape.quantity > 0) {
								return (
									<div key={tape.token_address + index} className="group relative rounded-lg shadow-sm">
										<Link to={`/listen/heds/hedstape/${tape.name[tape.name.length - 1]}`}>
											<div className="overflow-hidden group-hover:opacity-50 lg:aspect-none transition-all rounded-md bg-neutral-900">
												<img
													src={`http://www.heds.cloud/ipfs/${JSON.parse(tape.metadata).image.split("://")[1]
														}`}
													className={`h-full object-center object-cover lg:h-full ${tape.quantity === 0 && "grayscale"
														} group-hover:grayscale-0`}
												/>
											</div>
										</Link>
									</div>
								)
							}
						})}
				</div>
			</div> : <></>}
		</Fragment>
	);
};

export default Collection;
