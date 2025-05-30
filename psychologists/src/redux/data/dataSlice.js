import { createSlice } from "@reduxjs/toolkit"
import { fetchPsychologists } from "./dataOps"
const initialState = {
    name: "psychologists",
    psychologists:[],
    error:null,
    filters:{},
    psychologist:{},
    favorites:[],
    loggedInUser:"",
    isLoggedIn:false,
    isRegister:false,
    isLoggedOut:true,
    loading:false
}

export const psychologistSlice = createSlice({
    initialState,
    name:initialState.name,
    reducers:{
        setIsLoggedIn: (state,action) =>{
            state.isLoggedIn=action.payload;
            state.isLoggedOut=false;
        },
        setIsRegister: (state,action)=>{
            state.isRegister=action.payload;
            state.isLoggedOut=false;
        },
        setIsLoggedOut: (state,action)=>{
            state.isLoggedOut = action.payload;
            state.isLoggedIn=false;
        },
        setUserName: (state,action) =>{
            state.loggedInUser = action.payload;
        },
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
export const { setFilters, setFavorites, setIsLoggedIn, setUserName, setIsRegister, setIsLoggedOut } = psychologistSlice.actions;