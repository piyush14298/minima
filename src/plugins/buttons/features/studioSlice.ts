import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';

interface Color {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface Dimension {
	width: number;
	height: number;
}

interface ButtonStudioState {
	dimensions: Dimension;
	buttonText: string;
	textColor: Color;
	backgroundColor: Color;
	fontFamily: string;
	fontSize: number;
}

const initialDimension: Dimension = {
	width: 0,
	height: 0
}

const initialColor: Color = {
	r: 0,
	g: 0,
	b: 0,
	a: 0
}

const initialState: ButtonStudioState = {
	dimensions: initialDimension,
	buttonText: "",
	textColor: initialColor,
	backgroundColor: initialColor,
	fontFamily: "",
	fontSize: 10
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
				action: PayloadAction<Color>) {
		state.textColor.r = action.payload.r;
		state.textColor.g = action.payload.g;
		state.textColor.b = action.payload.b;
		state.textColor.a = action.payload.a;
		},

		updateButtonBackgroundColor (state: ButtonStudioState, 
						action: PayloadAction<Color>) {
		state.backgroundColor.r = action.payload.r;
		state.backgroundColor.g = action.payload.g;
		state.backgroundColor.b = action.payload.b;
		state.backgroundColor.a = action.payload.a;
		},

		updateButtonFontFamily (state: ButtonStudioState, 
					action: PayloadAction<string>) {
		state.fontFamily = action.payload;
		},

		updateButtonFontSize (state: ButtonStudioState, 
				action: PayloadAction<number>) {
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