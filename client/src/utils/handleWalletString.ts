const handleWalletString = (name: string) => {
	if (name?.includes("0x")) {
		let parsedName = name.slice(0, 5);
		return parsedName;
	} else return name;
};

export default handleWalletString;
