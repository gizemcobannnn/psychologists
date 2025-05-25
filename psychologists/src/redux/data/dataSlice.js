import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "psychologists",
    psychologists:[],
    error:null,
    filters:[],
    psychologist:{},
    favorites:[]
}

export const psychologistSlice = createSlice({
    initialState,
    name:initialState.name,
    reducers:{},
    extraReducers: (builder)=> {builder
        .addCase()
        .addCase()
        .addCase()
    }
})

export default psychologistSlice.reducer;