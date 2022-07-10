import React from "react";
import { CollectionItem } from "../../../models/common";
import { Link } from "react-router-dom";
import { UserState } from "../../../models/userModel";
import { collectionEmptyStates } from "../../../utils/emptyStates/collectionEmptyState";

const Collection = (userData: UserState) => {
	return (
		<div className="col-span-12 lg:col-span-auto mt-5">
			<h1 className="col-span-12 text-2xl tracking-widest font-semibold text-neutral-500 px-3.5 mb-2">COLLECTION</h1>
			<div className="grid grid-cols-2 xl:grid-cols-6 place-items-center items-center gap-y-2 gap-x-2 bg-neutral-900 p-2 rounded-lg mx-2">
				{userData.collection &&
					collectionEmptyStates(Object.values(userData?.collection)).map((tape: CollectionItem, index: number) => {
						if (tape.quantity > 0) {
							return (
								<div key={tape.token_address} className="group relative">
									<Link to={`/listen/heds/hedstape/${tape.name[tape.name.length - 1]}`}>
										<div className="overflow-hidden group-hover:opacity-50 lg:aspect-none transition-all rounded-md bg-neutral-900">
											<img
												src={`http://www.heds.cloud/ipfs/${JSON.parse(tape.metadata).image.split("://")[1]}`}
												className={`h-full object-center object-cover lg:h-full ${
													tape.quantity === 0 && "grayscale"
												} group-hover:grayscale-0`}
											/>
										</div>
									</Link>
								</div>
							);
						} else {
							return (
								<div
									key={tape.token_address + index}
									className="hidden lg:inline max-w-full max-h-full lg:min-h-full lg:min-w-full rounded-lg bg-neutral-850"></div>
							);
						}
					})}
			</div>
		</div>
	);
};

export default Collection;
