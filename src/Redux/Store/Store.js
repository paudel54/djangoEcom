import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from '../Features/rootSlice'
import productListReducer from '../slice/product/productSlice'
import productDetailsReducer from '../slice/product/productDetailsSlice'

const store = configureStore({
    reducer: {
        productDetails: productDetailsReducer,
        productList: productListReducer,

    },
});

export default store;