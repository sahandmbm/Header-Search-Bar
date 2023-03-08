// action - state management
import * as actionTypes from './actions';

export const initialState = {
    searchResult: [],
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH:
            return {
                ...state,
                searchResult: action.searchResult
            };
        default:
            return state;
    }
};

export default searchReducer;
