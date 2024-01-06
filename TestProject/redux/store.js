import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import postSlice from './postSlice';

const store = configureStore({
  reducer: rootReducer,
  posts: postSlice,
});

export default store;
