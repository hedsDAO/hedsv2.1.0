import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import useMoralisHooks from "../../hooks/useMoralis";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface AudioFileUploaderProps {
	file: File | null | undefined;
	setFile: Function;
}

const AudioFileUploader = ({ file, setFile }: AudioFileUploaderProps) => {
	const submissionsState = useSelector((state: RootState) => state.submissionsModel);
	const { loading } = submissionsState;
	const { uploadFile } = useMoralisHooks();
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		if (error) setTimeout(() => setError(null), 3000);
	}, [error]);
	return (
		<div className="my-8 mx-auto flex items-center flex-col">
			<h6 className="mb-2 text-lg text-center font-extralight uppercase text-neutral-100">UPLOAD SUBMISSION</h6>
			<p className="text-sm font-thin text-center text-neutral-400 mb-10">
				<span className="text-amber-500">Please be patient when uploading larger files.</span> IPFS may have longer upload times at
				the current moment.
			</p>
			<div className="flex items-center my-2">
				<input
					className="text-neutral-300 text-sm uppercase border border-neutral-800 rounded-none focus:outline-none"
					type="file"
					onChange={(e) => {
						if (e.target.files) {
							const fileType = e.target.files[0].type;
							if (fileType !== "audio/mpeg" && fileType !== "audio/wav") {
								setError("please upload a .wav or .mp3 file");
							} else {
								setFile(e.target.files[0]);
							}
						}
					}}
				/>
				{file && (
					<button
						disabled={loading}
						className="px-4 py-2 mx-1 rounded-none border hover:bg-green-800 text-neutral-100 hover:text-neutral-300 border-neutral-700 bg-green-500"
						type="button"
						onClick={() => uploadFile(file)}>
						{loading ? (
							<ReactLoading className="w-6 h-6 mx-2" type={"bars"} color={"#eee"} height={"30"} width={"30"} />
						) : (
							"Upload"
						)}
					</button>
				)}
			</div>
			<small className="mx-auto text-center font-thin uppercase my-2 text-neutral-500">
				{error ? <span className="text-red-500">{error}</span> : "supported files: mp3, wav"}
			</small>
		</div>
	);
};
export default AudioFileUploader;
