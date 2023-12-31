import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
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
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter((x) => x.product !== productId);
            // Update localStorage after removing an item
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

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
    }

});


//generate Reducer
// const cartReducer = cartSlice.reducer
// export default cartReducer;

export const { addCartItem, removeFromCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;