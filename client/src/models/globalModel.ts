import { createModel } from "@rematch/core";
import type { RootModel } from ".";

export enum Modals {
	EMPTY = 0,
	CONNECT,
	SETTINGS,
	TWITTER,
	VOTE,
	SUBMIT,
	MINT,
	OGHED,
	WARNING,
	PRE_MINT,
	PUBLIC_MINT
}

interface ModalState {
	open: boolean;
	modal: Modals;
	locked: boolean;
}

export interface GlobalState {
	modal: ModalState;
	space: string;
	tape: string;
	id: string;
}

export const globalModel = createModel<RootModel>()({
	state: {
		modal: {
			modal: Modals.EMPTY,
			open: false,
			locked: false,
		},
		space: "",
		tape: "",
		id: "",
	} as GlobalState,
	reducers: {
		setModal: (state, modal: ModalState) => {
			const newState = { ...state };
			newState.modal = modal;
			return newState;
		},
		setModalLock: (state, locked) => {
			const newState = { ...state };
			newState.modal.locked = locked;
			return newState;
		},
		setSpaceTapeId: (state, [space, tape, id]) => {
			const newState = { ...state };
			newState.space = space;
			newState.tape = tape;
			newState.id = id;
			return newState;
		},
		setModalVisibility: (state, open: boolean) => {
			const newState = { ...state };
			newState.modal.open = open;
			return newState;
		},
		clearModalState: (state) => {
			const newState = { ...state };
			newState.modal = { modal: Modals.EMPTY, open: false, locked: false };
			return newState;
		},
	},
	effects: () => ({}),
});
