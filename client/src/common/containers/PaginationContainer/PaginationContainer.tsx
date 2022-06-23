import React from "react";


const PaginationContainer = ({ pages, currentPage, maxPages }: any) => {
	return (
		<nav
			className="border-t border-neutral-700 px-4 flex items-center justify-between mx-5 sm:mx-1 md:mx-2 lg:mx-0"
			aria-label="Pagination">
			{pages?.length && (
				<>
					<div className="-mt-px w-0 flex-1 flex">
						<button
							className="border-t-2 border-transparent uppercase font-thin pt-4 pr-1 inline-flex items-center text-sm text-gray-500 hover:text-neutral-400">
							<i className="fa-thin fa-arrow-left text-neutral-500 mr-2"></i>
							Previous
						</button>
					</div>
					<div className="hidden md:-mt-px md:flex">
						{new Array(maxPages).fill(" ").map((fill, idx) => {
							if (currentPage === idx + 1) {
								return (
									<button
										disabled
										key={`page${fill}${idx}`}
										className="border-amber-500 border-t text-amber-500 pt-4 px-4 inline-flex items-center text-sm font-thin">
										{idx + 1}
									</button>
								);
							}
							return (
								<button
									key={`page${fill}${idx}`}
									className="border-transparent text-gray-500 hover:text-neutral-300 pt-4 px-4 inline-flex items-center text-sm font-thin">
									{idx + 1}
								</button>
							);
						})}
					</div>
					<div className="-mt-px w-0 flex-1 flex justify-end">
						<button
							className="border-t-2 border-transparent uppercase pt-4 pl-1 inline-flex items-center text-sm font-thin text-gray-500 hover:text-neutral-400">
							Next
							<i className="fa-thin fa-arrow-right text-neutral-500 ml-2"></i>
						</button>
					</div>
				</>
			)}
		</nav>
	);
};

export default PaginationContainer;
