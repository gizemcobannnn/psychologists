import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PROJECT_ID='fir-psychologists';

export const fetchPsychologists = createAsyncThunk('psychologists/fetchPsychologists', async (_,thunkAPI)=>{
  try{
    const response = await axios.get(`https://fir-psychologists-default-rtdb.europe-west1.firebasedatabase.app/.json?print=pretty`);
    return response.data || [];
  }catch(e){
    thunkAPI.rejectWithValue(e.message);
  }
})  