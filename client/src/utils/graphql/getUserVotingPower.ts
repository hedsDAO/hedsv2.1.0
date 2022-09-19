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
          proposal: "0x38ea2647ea27266b92422b59a97082ef58b30304ad27ca7cd13b898f7da0d9b3"
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