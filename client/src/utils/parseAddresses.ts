import { CollectionItem, CollectionTank } from "../models/common";

const hedsTapeAddresses: Array<string> = [
	"0xde8a0b17d3dc0468adc65309881d9d6a6cd66372".toLowerCase(),
	"0x5083cf11003f2b25ca7456717e6dc980545002e5".toLowerCase(),
	"0x567e687c93103010962f9e9cf5730ae8dbfc6d41".toLowerCase(),
	"0x8045fd700946a00436923f37d08f280ade3b4af6".toLowerCase(),
	"0x8f36eB094F7B960a234a482d4d8FFb8b37f728C6".toLowerCase(),
	"0x885236535d5cf7033bdc5bc1050cad7fdf4970a6".toLowerCase()
];

const parseAddresses = (userCollection: any) => {
	console.log(userCollection)
	const collectionTank: CollectionTank = {};
	if (Array.isArray(userCollection))
		userCollection.sort((a,b) => a.block_number - b.block_number)
		userCollection.map((item: CollectionItem) => {
			const { token_address, token_uri, name, metadata } = item;
			if (hedsTapeAddresses.includes(item.token_address.toLowerCase())) {
				if (collectionTank?.[token_address.toLowerCase()]?.quantity) {
					collectionTank[token_address.toLowerCase()].quantity++;
				} else collectionTank[token_address.toLowerCase()] = { quantity: 1, token_address, token_uri, name, metadata };
			}
		});
	return collectionTank;
};

export { parseAddresses };
