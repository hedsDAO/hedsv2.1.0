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
          proposal: "0xf9716a70e510aec8668633428c43e88e517634522445bff7596b0c9afec30e10"
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