import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData:null,
}

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        postData : (state,action) =>  {
            state.postData = action.payload;
            console.log("action.payload",action.payload)
        }, 
    }
})

export const {postData} = postSlice.actions;
export default postSlice.reducer;