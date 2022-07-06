export const getSplitsUserBalance = async (walletId: string) => {
	let results = await fetch("https://api.thegraph.com/subgraphs/name/0xsplits/splits-subgraph-ethereum", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `{
        user(id: "${walletId}") {
          id
          withdrawals {
            amount
            token {
              id
            }
          }
          internalBalances {
            amount
            token {
              id
            }
          }
          upstream {
            id
          }
        }
      }
      `,
		}),
	});
	let { data } = await results.json();
	if (!data) return null;
	return data;
};