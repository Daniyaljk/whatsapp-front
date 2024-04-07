import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import  axios from "axios";
import {act} from "react-dom/test-utils";
import {registerUserValue} from "../../types/redux-types.ts";
import {valueOf} from "postcss";


const initialState = {
    status: "",
    error: "",
    user: {
        _id: "",
        name: "dani",
        email: "",
        picture: "pic",
        status: "",
        access_token: ""
    }
}




export const registerUser:any = createAsyncThunk("auth/register", async (value:registerUserValue, { rejectWithValue })=>{
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_APP_API}/auth/register`,{
            ...value
        })

        return data.user
    }catch (err:any){
       return rejectWithValue(err.response.data.message)

    }
})

export const loginUser:any = createAsyncThunk("auth/login",async (value,{ rejectWithValue })=>{
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_APP_API}/auth/login`,{
            ...value
        })

        return data.user
    }catch (err:any){
        return rejectWithValue(err.response.data.message)

    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                _id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                access_token: ""
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(registerUser.pending,(state)=>{
                state.status = "loading"
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.user = action.payload
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.payload
            })

            .addCase(loginUser.pending,(state)=>{
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.user = action.payload
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.status = "failed";
                state.error = action.payload
            })



    }
})


export const {logout} = userSlice.actions;

export default userSlice.reducer
