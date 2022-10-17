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
          proposal: "0xf9716a70e510aec8668633428c43e88e517634522445bff7596b0c9afec30e10"
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
