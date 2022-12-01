import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../index";
import { TapeStatus } from "./common";

export interface TapeData {
    sample: {
        artist: string;
        audio: string;
        video: string;
        bpm: string;
        image: string;
        wallet: string;
    };
    tape: {
        id: number;
        no: string;
        image: string;
        name: string;
        description: string;
        contract: string;
        duration: string;
        quantity: string;
        season: string;
        tracks: number;
    };
    links: {
        etherscan: string;
        route: string;
        opensea: string;
        snapshot?: string;
        splits?: string;
    };
    status: {
        countdown: boolean;
        status: number;
        time: string;
    };
    collab: {
        name: string;
        curator?: string;
        image: string;
    };
}

export interface SpaceData {
    [tape: string]: { [id: string | number]: TapeData };
}

export const spaceModel = createModel<RootModel>()({
    state: {} as SpaceData,
    reducers: {
        setSpaceData: (state, payload: SpaceData) => payload || state,
    },
    effects: (dispatch) => ({
        async getSpaceData(space?: string) {
            const docRef = doc(db, "spaces", space || "heds");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let spaceData = { ...docSnap.data()?.[space || "heds"] };
                // note: tape status test
                // spaceData.hedstape["10"].status.status = 3;
                dispatch.spaceModel.setSpaceData(spaceData || docSnap.data()?.[space || "heds"]);
            }
        },
        async updateTapeStatus() {
            const docRef = doc(db, "spaces", "heds");
            const tapeSnap = await getDoc(docRef);
            if (tapeSnap.exists()) {
                let spaceData = { ...tapeSnap.data() };
                const idLength = Object.keys(spaceData["heds"]["hedstape"])?.length;
                const currentTape = Object.keys(spaceData["heds"]["hedstape"])[idLength - 1];
                const currentStatus = spaceData["heds"]["hedstape"][currentTape].status.status;
                if (currentStatus === TapeStatus.MINT_OPEN) {
                    spaceData["heds"]["hedstape"][currentTape].status.time = "";
                    spaceData["heds"]["hedstape"][currentTape].status.status = 8;
                    spaceData["heds"]["hedstape"][currentTape].status.countdown = false;
					try {
						await updateDoc(docRef, spaceData);
						this.setSpaceData(spaceData["heds"]);
					}
					catch (err) {
						console.log(err)
					}
                } else if (currentStatus === TapeStatus.VOTE_CLOSE) {
                    spaceData["heds"]["hedstape"][currentTape].status.time = "31 September 2022 12:00:00 GMT-07:00";
                    spaceData["heds"]["hedstape"][currentTape].status.status = 7;
					try {
						await updateDoc(docRef, spaceData);
						this.setSpaceData(spaceData["heds"]);
					}
					catch (err) {
						console.log(err)
					}
                }
            }
        },
    }),
});
