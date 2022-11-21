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
          proposal: "0xfbdcea3a7ba5c74aa9e31da5b71ac4f5e3add82805a35f130ca17372712beeff"
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