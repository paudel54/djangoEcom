import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    product: { reviews: [] },
    loading: false,
    error: null,
};

export const listProductDetails = createAsyncThunk('productDetails/listProductsDetails', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data);
    }
});


const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(listProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProductDetails.fulfilled, (state, action) => {

                state.product = action.payload;
                state.loading = false;
            })
            .addCase(listProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.product = [];
                state.error = action.error.message;
            })
    },
})

//generate Reducer
const productDetailsReducer = productDetailsSlice.reducer
export default productDetailsReducer;











