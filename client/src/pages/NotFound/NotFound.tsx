import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<>
			<div className=" min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center -mt-52">
				<div className="max-w-max mx-auto">
					<main className="sm:flex items-center px-20 sm:text-left mx-3 text-center mt-20">
						<p className="text-4xl font-extrabold text-neutral-600 sm:text-4xl">404</p>
						<div className="sm:ml-6">
							<div className="sm:border-l sm:border-gray-200 sm:pl-6">
								<button className="inline-flex items-center text-neutral-300 font-lg font-thin uppercase rounded-sm sm:mt-0 mt-2 px-3 py-1.5 border border-neutral-600 group">
									<Link to="/">
										<p className="text-sm text-neutral-200 md:tracking-widest">return home</p>
									</Link>
									<i className="fa-regular fa-angles-right ml-2 group-hover:ml-3 transition-all text-xs mt-0.5"></i>
								</button>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
};
export default NotFound;
