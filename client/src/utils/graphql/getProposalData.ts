export const getProposalData = async () => {
	let results = await fetch("https://hub.snapshot.org/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `{
                proposals(
                  first: 20,
                  skip: 0,
                  where: {
                    space_in: ["heds", "camb0t.eth"],
                  },
                  orderBy: "created",
                  orderDirection: desc
                ) {
                  strategies {
                    name
                    network
                    params
                }
                  id
                  title
                  body
                  choices
                  start
                  end
                  snapshot
                  state
                  author
                  space {
                    id
                    name
                  }
                }
              }`,
		}),
	});
	let { data } = await results.json();
	if (!data) return null;
	return data;
};
