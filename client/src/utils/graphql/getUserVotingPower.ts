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
          proposal: "0xce946575fcd3de552dc3265dc533faa9b12d706b8f0035cf0c0e790efd4c940a"
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