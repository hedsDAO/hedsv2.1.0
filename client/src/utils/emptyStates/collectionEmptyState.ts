import { CollectionItem } from "../../models/common";

export const emptyState: CollectionItem = {
	name: "",
	metadata: "",
	quantity: 0,
	token_address: "",
	token_uri: "",
};

const collectionEmptyStates = (collection: Array<CollectionItem>): Array<CollectionItem> => {
	const colLength: number = collection?.length % 6;
	for (let i = 6; i > colLength; i--) {
		collection.push(emptyState);
	}
	return collection;
};

export { collectionEmptyStates };
