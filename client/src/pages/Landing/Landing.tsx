import React from "react";
import { Link } from "react-router-dom";
import video1 from "../../../../public/dacut4.mp4";
import video2 from "../../../../public/dacut5.mp4";
import hedDotImg from "../../../../public/heddot.png";

const Landing = () => {
	return (
		<>
			<div className="absolute right-12 bottom-1/3 md:bottom-[40%] md:right-[20%] z-30 px-5 pb-5">
				<div className="flex flex-col items-end md:items-start font-serif uppercase mt-5">
					<h3 className="text-xl md:text-7xl text-neutral-200 font-extrabold bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-1 rounded-t-sm">
						hedsTAPE 06{" "}
					</h3>
					<span className="text-neutral-400 text-xs font-thin md:text-lg bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-0.5 rounded-b-sm ">
						sample from
					</span>
				</div>
				<div className="flex flex-col items-end md:items-start font-serif uppercase mb-5">
					<h1 className="text-2xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-100 font-bold mt-5 md:mt-10 bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-1 rounded-t-sm">
						DANIEL ALLAN
					</h1>
					<span className="text-neutral-400 text-xs font-thin md:text-lg bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-0.5 rounded-b-sm ">
						producer / dj
					</span>
				</div>
				<div className="flex justify-end lg:justify-start items-center md:w-auto mt-8">
					<div className="flex flex-col items-start gap-y-2">
						<button className="flex items-center md:mx-0 mx-auto justify-between w-36 md:w-36 font-base py-2 px-5 text-neutral-200 bg-neutral-900 bg-opacity-80 font-sans uppercase rounded-md text-sm group">
							<Link to="/listen/hedstape/5">
								<p className="text-sm text-neutral-200 md:tracking-widest">VIEW TAPE</p>
							</Link>
							<i className="fa-regular fa-angles-right ml-2 group-hover:ml-3 transition-all text-xs mt-0.5"></i>
						</button>
					</div>
				</div>
			</div>
			<video playsInline autoPlay muted loop className="absolute object-cover w-full md:w-7/12 h-screen z-20" src={video2} />
			<img
				src={hedDotImg}
				className="absolute object-cover top-1/4 md:right-[9.3%] z-10 md:w-[20%] cover md:top-40 lg:top-28 md:inline hidden animate-pulse border-[0.25px] rounded-sm border-neutral-400"
			/>
			<div className="absolute md:inline hidden right-0 bottom-0 z-10">
				<video
					playsInline
					autoPlay
					muted
					loop
					src={video1}
					className="object-cover max-h-[54vh] animate__animated animate__fadeInLeft"
				/>
			</div>
		</>
	);
};

export default Landing;
