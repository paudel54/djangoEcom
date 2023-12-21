import { configureStore } from '@reduxjs/toolkit'

// import rootReducer from '../Features/rootSlice'
import productListSlice from '../slice/product/productSlice'

const store = configureStore({
    reducer: {
        // reducer: rootReducer,
        productList: productListSlice
    }
})

export default store