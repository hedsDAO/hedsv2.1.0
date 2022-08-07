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
          proposal: "0x584e05550c266a7bbf981224c64f481cf5e3d5f1f59f7c02a1d2d0c9344b791e"
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
