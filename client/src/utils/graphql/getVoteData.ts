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
          proposal: "0xfe0bb42c9643f1dd0bdeb4435435fe51cbb32b20fa3143daf2f01fdd941b0085"
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
