export const getVoteData = async () => {
	let results = await fetch("https://hub.snapshot.org/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `{
      votes (
        first: 1000
        where: {
          proposal: "0xfbdcea3a7ba5c74aa9e31da5b71ac4f5e3add82805a35f130ca17372712beeff"
        }
      ) {
        id
        voter
        created
        vp
        choice
        space {
          id
        }
      }
    }`,
		}),
	});
	let { data } = await results.json();
	if (!data) return null;
	return data;
};
