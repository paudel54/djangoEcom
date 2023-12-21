import { productListRequest } from "./src/Redux/slice/product/productSlice"

const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products: [] }
        case 'PRODUCT_LIST_SUCCESS':
            return { loading: false, products: action.payload }
        case 'PRODUCT_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products/')

        dispatch({
            type: PRODUCT_LIST_REQUEST,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}