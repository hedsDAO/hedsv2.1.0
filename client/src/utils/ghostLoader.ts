const ghostLoader = (setIsLoading: Function, time?: number) => {
	if (setIsLoading) {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, time || 2000);
	}
};

export { ghostLoader };
