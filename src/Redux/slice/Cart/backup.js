import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';


export const addCartItemAsync = createAsyncThunk(
    'cart/addCartItem',
    async ({ id, qty }, { getState, dispatch }) => {
        // console.log('checking out payload', payload)
        // const { id, qty } = payload
        console.log('Cheking out id and quantity from addCartItem', id, qty)

        try {
            // Fetch product details using Redux Toolkit Query
            const { data } = await axios.get(`/api/products/${id}`);
            const newItem = {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            };

            // Dispatch the addCartItem action with the newItem payload
            dispatch(cartSlice.actions.addCartItem(newItem));

            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        } catch (error) {
            // Handle the error
            console.error('Error adding item to cart:', error);
        }
    }

);



// Create a slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [], shippingAddress: {}, paymentMethod: null },
    reducers: {
        addCartItem(state, action) {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => {
                return x.product === item.product
            });

            // console.log('checking current', existItem && current(existItem))
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.product === existItem.product ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }


        },
    }

});


//generate Reducer
// const cartReducer = cartSlice.reducer
// export default cartReducer;

export const { addCartItem, updateCartItem } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;


///revise

import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit/query/react';
import { api } from './api'; // Assuming you have an api.js file for RTK Query setup

// Async thunk to fetch product data by ID
export const fetchProductById = createAsyncThunk('cart/fetchProductById', async (productId) => {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x.product === item.product);

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.product === existingItem.product ? item : x
                );
            } else {
                state.cartItems.push(item);
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.product !== productId);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        clearCartItems: (state) => {
            state.cartItems = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            const data = action.payload;
            state.cartItems.push({
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: 1,
            });
        });
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
