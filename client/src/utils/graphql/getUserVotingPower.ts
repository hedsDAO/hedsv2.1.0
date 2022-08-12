export const getUserVotingPower = async (walletId: string) => {
	let results = await fetch("https://hub.snapshot.org/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `{
        vp (
          voter: "${walletId}"
          space: "camb0t.eth"
          proposal: "0x864583ca2d5526b8d44f3c41c2c4f8507bece0ba95aad071d16dd13bac4b395c"
        ) {
          vp
          vp_by_strategy
          vp_state
        } 
      }`,
		}),
	});
	let { data } = await results.json();
	if (!data) return null;
	return data;
};