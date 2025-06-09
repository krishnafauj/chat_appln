import { createSlice } from "@reduxjs/toolkit";
const initialState=createSlice({
    name:"user",
    initialState:{
        user:null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        removeUser:(state)=>{
            state.user=null;
        }
    }
})
export const {setUser,removeUser}=initialState.actions;
export default initialState.reducer;