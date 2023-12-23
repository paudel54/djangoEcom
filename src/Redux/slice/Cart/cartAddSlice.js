import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for adding items to the cart
export const addCartItemAsync = createAsyncThunk(
    'cart/addCartItem',
    async (payload, { getState, dispatch }) => {
        console.log('checking out payload', payload)
        const { id, qty } = payload
        // console.log('Cheking out id and quantity from addCartItem', id, qty)

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


// Async Thunk for removing an item from the cart
export const removeCartItem = createAsyncThunk(
    'cart/removeItem',
    async (productId) => {
        // Your logic for removing an item from the cart
        // Example: await api.removeFromCart(productId);
        return productId;
    }
);

// Async Thunk for saving the shipping address
export const saveShippingAddress = createAsyncThunk(
    'cart/saveShippingAddress',
    async (shippingAddress) => {
        // Your logic for saving the shipping address
        // Example: await api.saveShippingAddress(shippingAddress);
        return shippingAddress;
    }
);

// Async Thunk for saving the payment method
export const savePaymentMethod = createAsyncThunk(
    'cart/savePaymentMethod',
    async (paymentMethod) => {
        // Your logic for saving the payment method
        // Example: await api.savePaymentMethod(paymentMethod);
        return paymentMethod;
    }
);

// Async Thunk for clearing cart items
export const clearCartItems = createAsyncThunk(
    'cart/clearItems',
    async () => {
        // Your logic for clearing cart items
        // Example: await api.clearCart();
    }
);

// Create a slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [], shippingAddress: {}, paymentMethod: null },
    reducers: {
        addCartItem(state, action) {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x.product === existItem.product ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        },
    }
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(addCartItem.fulfilled, (state, action) => {
    //             const item = action.payload;
    //             const existItem = state.cartItems.find((x) => x.product === item.product);

    //             if (existItem) {
    //                 state.cartItems = state.cartItems.map((x) =>
    //                     x.product === existItem.product ? item : x
    //                 );
    //             } else {
    //                 state.cartItems = [...state.cartItems, item];
    //             }
    //         })
    //         .addCase(removeCartItem.fulfilled, (state, action) => {
    //             const productId = action.payload;
    //             state.cartItems = state.cartItems.filter((x) => x.product !== productId);
    //         })
    //         .addCase(saveShippingAddress.fulfilled, (state, action) => {
    //             state.shippingAddress = action.payload;
    //         })
    //         .addCase(savePaymentMethod.fulfilled, (state, action) => {
    //             state.paymentMethod = action.payload;
    //         })
    //         .addCase(clearCartItems.fulfilled, (state) => {
    //             state.cartItems = [];
    //         });
    // },
});


//generate Reducer
// const cartReducer = cartSlice.reducer
// export default cartReducer;

export const { addCartItem } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;