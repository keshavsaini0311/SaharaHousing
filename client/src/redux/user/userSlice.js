/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentUSer:null,
    error:null,
    loading:null
} 

const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUSer=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.currentUSer=action.payload;
            state.loading=false;
        },
        
    }
})

export const { signInStart,signInSuccess,signInFailure } = userSlice.actions;

export default userSlice.reducer;