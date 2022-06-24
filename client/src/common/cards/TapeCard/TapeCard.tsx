import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import dacut1 from "../../../../../public/dacut4.mp4";

const TapeCard = ({ tape, featured }: any) => {
	console.log(tape)
	const [isFlipped, setIsFlipped] = useState<boolean>(false);
	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
			<div className="flex flex-col w-full justify-center">
				{featured ? (
					<video
						src={dacut1}
						loop
						muted
						autoPlay
						playsInline
						className={
							featured
								? "lg:w-[400px] lg:h-[400px] h-[80vw] w-[80vw] object-cover bg-neutral-900 border-fuchsia-900 border-2 p-1 rounded-full"
								: " object-contain"
						}
					/>
				) : (
					<img
						src={tape.image}
						className={
							featured
								? "lg:w-[400px] w-[80vw] object-contain bg-neutral-900 border-fuchsia-900 border-2 p-1 rounded-full"
								: " object-contain"
						}
					/>
				)}
				<div className="flex justify-between items-center">
					<button onClick={() => setIsFlipped(!isFlipped)} className="">
						{!featured && <DotsHorizontalIcon className="h-8 w-8 text-neutral-400" />}
					</button>
					{!featured && <span className="text-sm font-thin font-serif text-neutral-400 px-1">{tape.name}</span>}
				</div>
			</div>
			<div className="flex flex-col justify-center">
				<img
					src={tape.image}
					className={featured ? "lg:w-[400px] object-contain bg-neutral-400 opacity-20" : "object-contain opacity-20"}
				/>
				<div className="flex justify-between items-center">
					<button onClick={() => setIsFlipped(!isFlipped)} className="">
						<DotsHorizontalIcon className="h-8 w-8 text-neutral-400" />
					</button>
					<span className="text-sm font-thin font-serif text-neutral-400 px-1">{tape.name}</span>
				</div>
			</div>
		</ReactCardFlip>
	);
};

export default TapeCard;
