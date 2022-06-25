import axios from "axios";

const headers = { Accept: "application/json", "X-API-KEY": "96f93b237cd14aafbda92f6d5cbf49ca" };

const getCollectionStats = async (collection: string) => {
	try {
		return await axios.get(`https://api.opensea.io/api/v1/collection/${collection}/stats`, { headers });
	} catch {
		return new Error("unable to fetch OpenSea asset data");
	}
};

export { getCollectionStats };
