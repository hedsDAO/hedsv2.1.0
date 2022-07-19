import { CollectionItem, CollectionTank } from "../models/common";

const hedsTapeAddresses: Array<string> = [
	"0xde8a0b17d3dc0468adc65309881d9d6a6cd66372",
	"0x5083cf11003f2b25ca7456717e6dc980545002e5",
	"0x567e687c93103010962f9e9cf5730ae8dbfc6d41",
	"0x8045fd700946a00436923f37d08f280ade3b4af6",
	"0x8f36eb094f7b960a234a482d4d8ffb8b37f728c6",
];

const parseAddresses = (userCollection: any) => {
	const collectionTank: CollectionTank = {};
	if (Array.isArray(userCollection))
		userCollection.map((item: CollectionItem) => {
			const { token_address, token_uri, name, metadata } = item;
			if (hedsTapeAddresses.includes(item.token_address)) {
				if (collectionTank?.[token_address]?.quantity) {
					collectionTank[token_address].quantity++;
				} else collectionTank[token_address] = { quantity: 1, token_address, token_uri, name, metadata };
			}
		});
	return collectionTank;
};

export { parseAddresses };
