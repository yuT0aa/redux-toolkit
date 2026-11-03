import { configureStore } from '@reduxjs/toolkit';
import produitReducer from '../features/produitSlice';
import panierReducer from '../features/panierSlice';

export const store = configureStore({
  reducer: {
    produitsState: produitReducer,
    panierState: panierReducer,
  },
});