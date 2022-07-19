import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../index";
import { UserSubmission } from "./common";

export interface SubmissionsState {
	userSubmissions?: DocumentData;
	allSubmissions?: Array<UserSubmission>;
	currentSubmission?: string;
	submissionsCount: number;
	hasSubmitted?: boolean;
	loading?: boolean;
	updateError?: boolean;
}

export interface TapeContentId {
	space: string;
	tape: string;
	id: string;
}

export const submissionsModel = createModel<RootModel>()({
	state: {
		userSubmissions: undefined,
		allSubmissions: undefined,
		currentSubmission: undefined,
		submissionsCount: 0,
		hasSubmitted: false,
		loading: false,
	} as SubmissionsState,
	reducers: {
		setLoading: (state, loading: boolean) => ({ ...state, loading }),
		setCurrentSubmission: (state, currentSubmission: string) => ({ ...state, currentSubmission }),
		setUserSubmissions: (state, userSubmissions: DocumentData) => ({ ...state, userSubmissions }),
		setSubmissionsCount: (state, submissionsCount: number) => ({ ...state, submissionsCount }),
		setAllSubmissions: (state, allSubmissions: Array<UserSubmission>) => ({ ...state, allSubmissions }),
		setUpdateError: (state, updateError: boolean) => ({ ...state, updateError }),
		setHasSubmitted: (state, { space, tape, id }: TapeContentId) => ({
			...state,
			hasSubmitted: state.userSubmissions?.audio?.[space]?.[tape]?.[id] ? true : false,
		}),
	},
	effects: (dispatch) => ({
		async loadAllSubmissions([space, tape, id]: Array<string>) {
			const querySnapshot = await getDocs(collection(db, "submissions"))
			const submissionsTank: Array<UserSubmission> = [];
			querySnapshot.forEach((doc) => {
				// checks whether the tape submission exists
				if (doc.data()?.audio[space]?.[tape]?.[id]) {
					submissionsTank.push({
						id: doc.data().name,
						subId: doc.data().submissionIds?.[space]?.[tape]?.[id],
						link: doc.data().audio?.[space]?.[tape]?.[id],
					});
				}
			});
			this.setAllSubmissions(submissionsTank);
			this.setSubmissionsCount(submissionsTank.length);
		},
		async loadUserSubmissions([space, tape, id, walletId]: Array<string>) {
			const docRef = doc(db, "submissions", walletId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setUserSubmissions(docSnap.data());
				this.setHasSubmitted({ space, tape, id });
			}
		},
		async loadUserFavorties([space, tape, id, walletId]: Array<string>) {
			const docRef = doc(db, "voting", walletId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				dispatch.voteModel.setFavoritesList(docSnap.data()?.favorites?.[space]?.[tape]?.[id] || []);
				dispatch.voteModel.setFavoritesCount(docSnap.data()?.favorites?.[space]?.[tape]?.[id]?.length || 0);
			}
		},
		async handleSubmit([url, walletId, displayName, space, tape, id, submissionId]: Array<string>) {
			const db = getFirestore();
			const userRef = doc(db, "submissions", walletId);
			const getUserSubmissions = await getDoc(userRef);
			const prevSubmissions = getUserSubmissions.data()?.audio?.[space]?.[tape];
			const prevSubmissionIds = getUserSubmissions.data()?.submissionIds?.[space]?.[tape];
			try {
				if (getUserSubmissions.exists()) {
					await updateDoc(userRef, {
						audio: {
							[space]: {
								[tape]: {
									...prevSubmissions,
									[id]: url,
									[`${id}_submission_time`]: serverTimestamp(),
								},
							},
						},
						submissionIds: {
							[space]: {
								[tape]: {
									...prevSubmissionIds,
									[id]: submissionId,
								},
							},
						},
						name: displayName,
					});
				} else {
					await setDoc(userRef, {
						audio: {
							[space]: {
								[tape]: {
									[id]: url,
									[`${id}_submission_time`]: serverTimestamp(),
								},
							},
						},
						submissionIds: {
							[space]: {
								[tape]: {
									[id]: submissionId,
								},
							},
						},
						name: displayName,
					});
				}
			} catch (e) {
				this.setUpdateError(true);
				console.log(e);
			}
		},
		async updateFavorites([space, tape, id, favoritesList, walletId]: [string, string, string, Array<UserSubmission>, string]) {
			const db = getFirestore();
			const userRef = doc(db, "voting", walletId);
			const getUserSubmissions = await getDoc(userRef);
			const prevFavorites = getUserSubmissions.data()?.[space]?.[tape];
			try {
				if (getUserSubmissions.exists()) {
					await updateDoc(userRef, {
						favorites: {
							[space]: {
								[tape]: {
									...prevFavorites,
									[id]: favoritesList,
								},
							},
						},
					});
				} else {
					await setDoc(userRef, {
						favorites: {
							[space]: {
								[tape]: {
									[id]: favoritesList,
								},
							},
						},
					});
				}
			} catch (e) {
				// this.setUpdateFavrError(true);
				console.log(e);
			}
		},
	}),
});
