const handlePinataMetadata = (walletId: string, twitterHandle: string, submissionId: string, space: string, tape: string, id: string, duration: number) => {
	const options = {
		pinataMetadata: {
			name: id + "-" + walletId,
			keyvalues: {
				twitterHandle: twitterHandle,
				id: submissionId,
				space: space || "heds",
				tape: tape,
				duration: duration
			},
		},
	};
	return options;
};

export { handlePinataMetadata };
