import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PROJECT_URL='https://fir-psychologists-default-rtdb.europe-west1.firebasedatabase.app/';//it is the url of the firebase project, it can readed in over the db and copied 

export const fetchPsychologists = createAsyncThunk('psychologists/fetchPsychologists', async (_,thunkAPI)=>{
  try{
    const response = await axios.get(`${PROJECT_URL}.json?print=pretty`);
    return response.data || [];
  }catch(e){
    thunkAPI.rejectWithValue(e.message);
  }
})  