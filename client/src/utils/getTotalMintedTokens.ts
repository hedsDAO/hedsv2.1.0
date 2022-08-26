import axios from "axios";

const getTotalMintedTokens = (contract: string, chain?: string) => {
    const options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/nft/${contract}`,
        params: { chain: chain || "eth", format: "decimal" },
        headers: { Accept: "application/json", "X-API-Key": "test" },
    };
    axios
        // @ts-ignore
        .request(options)
        .then(function (response) {
            console.log(response.data.total)
            return response.data.total;
        })
        .catch(function (error) {
            console.error(error);
            return 0;
        });

};

export { getTotalMintedTokens };
