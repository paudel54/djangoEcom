import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from '../Features/rootSlice'
import productListReducer from '../slice/product/productSlice'
import productDetailsReducer from '../slice/product/productDetailsSlice'
import cartReducer from '../slice/Cart/cartAddSlice';

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
}

const store = configureStore({
    reducer: {
        productDetails: productDetailsReducer,
        productList: productListReducer,
        cart: cartReducer,

    },
    initialState
});


export default store;