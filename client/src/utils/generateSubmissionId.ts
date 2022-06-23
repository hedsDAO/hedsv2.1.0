import axios from "axios";
const GENERATE_ID_URL = "https://us-central1-heds-34ac0.cloudfunctions.net/generateId";

const generateSubmissionId = async () => {
	try {
		return await axios.get(GENERATE_ID_URL);
	} catch (e) {
		console.log(e);
	}
};

export { generateSubmissionId };
