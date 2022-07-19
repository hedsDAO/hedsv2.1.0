const handlePinataMetadata = (walletId: string, twitterHandle: string, submissionId: string, space: string, tape: string, id: string) => {
	const options = {
		pinataMetadata: {
			name: id + "-" + walletId,
			keyvalues: {
				twitterHandle: twitterHandle,
				id: submissionId,
				space: space || "heds",
				tape: tape,
			},
		},
	};
	return options;
};

export { handlePinataMetadata };
