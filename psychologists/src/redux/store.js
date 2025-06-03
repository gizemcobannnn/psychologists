import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { psychologistSlice } from './data/dataSlice';
import { configureStore } from '@reduxjs/toolkit';

const psychologistsPersistConfig ={
    key:"psychologists",
    storage,
    whitelist:["psychologists","filters","favorites","psychologist","isLoggedIn","loggedInUser"],
    version:1
}
const persistedPsychologistsReducer = persistReducer(psychologistsPersistConfig, psychologistSlice.reducer);

export const store = configureStore({
    reducer: {
        psychologists: persistedPsychologistsReducer
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export  const persistor = persistStore(store);
