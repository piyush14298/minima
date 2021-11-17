import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ButtonStudioState {
	state: string
}

export const stateInfo: Array<ButtonStudioState> = [];

const initialState: ButtonStudioState = {
	state: ""
}

const buttonStudioSlice = createSlice({
	name: "ButtonStudio",
	initialState,
	reducers: {
		updateButtonCss (state: ButtonStudioState,
			action: PayloadAction<string>) {
				state.state = action.payload
				stateInfo.push({
					state: state.state,
				});
		},
	}
})

export const buttonCssSelector = (state: RootState) => state.root.buttonStudio.state;

export const {
	updateButtonCss
} = buttonStudioSlice.actions

export default buttonStudioSlice.reducer;