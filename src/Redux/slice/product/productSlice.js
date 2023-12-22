import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    loading: false,
    error: null,
}

export const listProducts = createAsyncThunk('productList/listProducts', async () => {
    try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/products/');
        return data;
    } catch (error) {
        throw error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
    }
});




const productListSlice = createSlice({
    name: 'productList',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(listProducts.pending, (state) => {
                state.loading = true;
                state.products = [];
                state.error = null;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.products = [];
                state.error = action.error.message;
            })

    },


});
//generate Reducer
const productListReducer = productListSlice.reducer
export default productListReducer;
