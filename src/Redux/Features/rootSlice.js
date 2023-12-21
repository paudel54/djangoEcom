import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const rootSlice = createSlice(
    {
        name: "rootSlice",
        initialState,
    }
)
const rootReducer = rootSlice.reducer;
export default rootReducer;