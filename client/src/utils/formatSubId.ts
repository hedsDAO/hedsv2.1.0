const formatSubId = (words: string): string => {
	const splitWords = words.split(" ");
	let first = splitWords[0]?.toLowerCase();
	let second = splitWords[1]?.toUpperCase();
	return first + second;
};

export { formatSubId };
