import { combineReducers, configureStore } from '@reduxjs/toolkit';
import buttonStudioReducer from './features/studioSlice';

const rootReducer = combineReducers({
	buttonStudio: buttonStudioReducer
});

const store = configureStore({
	reducer: {
		root: rootReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;