import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

//initialState for USER slice::
const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        // default we have assumned user info to be {} empty object
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    }
}

//create action creator createAsyncThunk
//register

//creating promise based action so, we need to handle 3 states!:
//async 2nd parameters are thunk APIS :  that allows you to access additional functionalities and information during the execution of the asynchronous action.
//1.// dispatch: This property allows you to dispatch additional actions from within the createAsyncThunk function. You can use it to dispatch other actions before or after the asynchronous operation or to trigger side effects.
//2.getState: This property provides access to the current state of the Redux store. You can use it to access any data stored in the Redux store, including data from other slices or global application state.
//3. rejectWithValue: A callback function that you can use to return a rejected action with a specific payload. It allows you to manually reject the promise returned by the createAsyncThunk function and dispatch the corresponding actions yourself.


//These properties provide you with the flexibility to perform various tasks within the thunk function, such as dispatching actions, accessing the current state, handling errors, and customizing the fulfillment or rejection of the promise returned by the createAsyncThunk function.
//payload directly can be destructured onto async 1st parameter so it need not be mention on post method. 

//user action with async handler to handle promise:  
//promise would be handled and would be taken tinto reducer for operations. 

//generate action name registerUserAction(payload will be fed)
export const registerUserAction = createAsyncThunk('user/register', async (payload, { rejectWithValue, getState, dispatch }) => {
    // console.log('checking the payload from dispatch', payload);
    try {
        //header ::post method 
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        // on post req, 1st parameter endpoint, 2nd parameter object to send {} third extra config object including header and extra info
        const res = await axios.post(`${baseURL}users/register`, {
            fullname: payload.fullname,
            email: payload.email,
            password: payload.password
        }, config);

        //response get with others extra prop we only focus on data. 
        return res.data;
    } catch (error) {
        // console.log('lets see what error contains', error)
        return rejectWithValue(error.response.data)
    }
})

//action for login: 
export const loginUserAction = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
        //header: post method
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        //on Axios post we give on 3 parameters: URL, Object, config
        const res = await axios.post(`${baseURL}users/login`, {
            email,
            password
        }, config);
        //save user into localStorge. to implement JWT: JWT token are sent from backend 
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

//action for logout:
export const logoutUserAction = createAsyncThunk('user/logout', async () => {
    //removef from local storage
    localStorage.removeItem('userInfo')
    return null;
})

//!!! rejectWithValue helps to handle error , getState to get access to store and dispatch to update values.  
//{} 2nd parameters are availbae on store and we have destructured them . 
//action for profile : 
export const getProfileAction = createAsyncThunk('users/getProfile', async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
        //get the token
        const token = getState()?.users?.userAuth?.userInfo?.token
        //1. from localStorage 2. from Store. 
        //pass the token to header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        //make the request : can destructure res and write as {data}
        const res = await axios.get(`${baseURL}users/profile`, config);
        console.log('Checking out the response form user profile ', res);
        return res.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

//user Slice : reducers
const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        });
        //fulfilled
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            // payload comes from API response and gets stored onto userINFO
            state.loading = false;
            state.userAuth.userInfo = action.payload;
        })
        //rejected
        builder.addCase(registerUserAction.rejected, (state, action) => {
            // console.log("checking out the rejected action", action.payload)
            state.loading = false;
            state.userAuth.error = action.payload;
        })

        ////////////////////////////////////////LOGIN//////////////////
        //register
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
        });
        //fulfilled
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            // payload comes from API response and gets stored onto userINFO
            // console.log('Checking out state on Fullfilled', state);
            // console.log('Checking out action on Fullfilled', action);

            state.loading = false;
            state.userAuth.userInfo = action.payload;
        })
        //rejected
        builder.addCase(loginUserAction.rejected, (state, action) => {
            // console.log("checking out the rejected action", action.payload)
            state.loading = false;
            state.userAuth.error = action.payload;
        })

        ///logout: Success: 
        builder.addCase(logoutUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userAuth.userInfo = null;
        })

        ///////////////////////////PROFILE////////////////////////////////BUILDER>>>>>>>>>>>>>>>>>>>>>>>>
        builder.addCase(getProfileAction.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(getProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            //action.payload receives the api response  or return form action. 
            state.profile = action.payload;

        })

        builder.addCase(getProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // wipe out profile data if any errors:
            state.profile = "";

        })
    },
})

//generate reducer: 
const userReducer = usersSlice.reducer;
export default userReducer;