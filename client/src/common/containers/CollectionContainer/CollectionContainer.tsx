import React from "react";
import { Link } from "react-router-dom";
import { UserState } from "../../../models/userModel";

const CollectionContainer = ({ userCollection }: UserState) => {
	return (
		<div className="sm:py-10 mx-auto mt-10 md:mt-0 py-5">
			<h2 className="text-xl uppercase font-thin tracking-tight text-white">Collection</h2>
			<div className="mt-4 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				{userCollection &&
					userCollection.map((tape) => (
						<div key={tape.name} className="group relative">
							<Link to={tape.href}>
								<div className="w-full min-h-16 bg-gray-200 aspect-w-1 aspect-h-1 rounded-sm overflow-hidden group-hover:opacity-75 lg:h-16 lg:aspect-none transition-all">
									<img
										src={tape.src}
										className={`w-full h-full sm:max-h-16 max-h-10 object-center object-cover lg:w-full lg:h-full ${
											tape.quantity === 0 && "grayscale"
										} group-hover:grayscale-0`}
									/>
								</div>
								<div className="mt-2 flex justify-between">
									<div>
										<h3 className="text-sm text-neutral-400">
											<span aria-hidden="true" className="absolute inset-0" />
											{tape.name}
										</h3>
									</div>
									<p className="text-sm font-medium text-neutral-300">{tape.quantity}</p>
								</div>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
};

export default CollectionContainer;
