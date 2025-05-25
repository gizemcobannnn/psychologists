import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PROJECT_ID='fir-psychologists';

export const fetchPsychologists = createAsyncThunk('psychologists/fetchPsychologists', async (thunkAPI)=>{
  try{
    const response = axios.get(`https://${PROJECT_ID}.firebaseio.com/users/jack/name.json`);
    return response.data;
  }catch(e){
    thunkAPI.rejectWithValue(e.message);
  }
})