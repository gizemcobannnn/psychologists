import { createSlice } from "@reduxjs/toolkit"
import { fetchPsychologists } from "./dataOps"
const initialState = {
    name: "psychologists",
    psychologists:[],
    error:null,
    filters:{},
    psychologist:{},
    favorites:[],
    loading:false
}

export const psychologistSlice = createSlice({
    initialState,
    name:initialState.name,
    reducers:{
        setFilters:(state,action)=>{
            state.filters = {...state.filters, ...action.payload}
        },
        setFavorites: (state,action)=>{
            const id = action.payload;
            if(state.favorites.includes(id)){
                state.favorites=state.favorites.filter(idx=>idx!==id)
            }else{
                state.favorites.push(id);
            }

        }
    },
    extraReducers: (builder)=> {builder
        .addCase(fetchPsychologists.fulfilled,(state,action)=>{
            state.psychologists = action.payload;
            state.error = null;
            state.loading = false;

        })
        .addCase(fetchPsychologists.pending,(state)=>{
            state.psychologists = [];
            state.error = null;
            state.loading = true;
        })
        .addCase(fetchPsychologists.rejected,(state,action)=>{
            state.psychologists = [];
            state.error = action.payload;
            state.loading = false;
        })
    }
})

export default psychologistSlice.reducer;
export const { setFilters, setFavorites } = psychologistSlice.actions;