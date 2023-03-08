import { combineReducers } from 'redux';

// reducer import
import searchReducer from './searchReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    searchReducer: searchReducer
});

export default reducer;
