// import { productDetailsRequest } from "./src/Redux/slice/product/productSlice"

// const productDetailsReducer = (state = { product: {reviews:[]} }, action) => {
//     switch (action.type) {
//         case 'PRODUCT_DETAIlS_REQUEST':
//             return { loading: true, ...state }
//         case 'PRODUCT_DETAIlS_SUCCESS':
//             return { loading: false, products: action.payload }
//         case 'PRODUCT_DETAIlS_FAIL':
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }


// const listProductDetails = () => async (dispatch) => {
//     try {
//         dispatch({ type: PRODUCT_DETAILS_REQUEST })

//         const { data } = await axios.get(`/api/products/${id}`)

//         dispatch({
//             type: PRODUCT_DETAILS_REQUEST,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: PRODUCT_DETAILS_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//         })
//     }
// }

// export const listProductDetails = createAsyncThunk('productList/listProductsDetails', async () => {
//     try {
//         const { data } = await axios.get('http://127.0.0.1:8000/api/products/');
//         return data;
//     } catch (error) {
//         throw error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message;
//     }
// });