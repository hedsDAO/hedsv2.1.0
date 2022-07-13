import { createModel } from "@rematch/core";
import type { RootModel } from ".";

export enum Modals {
	EMPTY = 0,
	CONNECT,
	SETTINGS,
	TWITTER,
}

interface ModalState {
	open: boolean;
	modal: Modals;
	locked: boolean;
}

export interface GlobalState {
	modal: ModalState;
}

export const globalModel = createModel<RootModel>()({
	state: {
		modal: {
			modal: Modals.EMPTY,
			open: false,
			locked: false,
		},
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
