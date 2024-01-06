import { combineReducers } from 'redux';
import formReducer from './slice';
import postSlice from './postSlice';

const rootReducer = combineReducers({
  form: formReducer,
  posts: postSlice,
});

export default rootReducer;
