import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Dimension {
	width: string;
	height: string;
}

export interface ButtonStudioState {
	dimensions: Dimension;
	buttonText: string;
	textColor: string;
	backgroundColor: string;
	fontFamily: string;
	fontSize: string;
}

const initialDimension: Dimension = {
	width: "0",
	height: "0"
}

const initialState: ButtonStudioState = {
	dimensions: initialDimension,
	buttonText: "",
	textColor: "",
	backgroundColor: "",
	fontFamily: "",
	fontSize: "10"
}

const buttonStudioSlice = createSlice({
	name: "ButtonStudio",
	initialState,
	reducers: {
		updateButtonDimensions (state: ButtonStudioState, 
					action: PayloadAction<Dimension>) {
		state.dimensions.width = action.payload.width;
		state.dimensions.height = action.payload.height;
		},

		updateButtonText (state: ButtonStudioState, 
			action: PayloadAction<string>) {
		state.buttonText = action.payload;
		},

		updateButtonTextColor (state: ButtonStudioState, 
				action: PayloadAction<string>) {
		state.textColor = action.payload;
		},

		updateButtonBackgroundColor (state: ButtonStudioState, 
						action: PayloadAction<string>) {
		state.backgroundColor = action.payload;
		},

		updateButtonFontFamily (state: ButtonStudioState, 
					action: PayloadAction<string>) {
		state.fontFamily = action.payload;
		},

		updateButtonFontSize (state: ButtonStudioState, 
				action: PayloadAction<string>) {
		state.fontSize = action.payload;
		}
	}
})

export const buttonDimensionSelector = (state: RootState) => state.root.buttonStudio.dimensions;

export const buttonTextSelector = (state: RootState) => state.root.buttonStudio.buttonText;

export const buttonTextColorSelector = (state: RootState) => state.root.buttonStudio.textColor;

export const buttonBackgroundColorSelector = (state: RootState) => state.root.buttonStudio.backgroundColor;

export const buttonFontFamilySelector = (state: RootState) => state.root.buttonStudio.fontFamily;

export const buttonFontSizeSelector = (state: RootState) => state.root.buttonStudio.fontSize;

export const {
	updateButtonDimensions,
	updateButtonText,
	updateButtonTextColor,
	updateButtonBackgroundColor,
	updateButtonFontFamily,
	updateButtonFontSize
} = buttonStudioSlice.actions

export default buttonStudioSlice.reducer;