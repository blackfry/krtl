import * as actionTypes from '../actionTypes';

let defaultState = {

    // GET SEARCH TERMS FROM YT
    termsInitiated: null,
    termsSuccess: null,
    termsFailed: null,

    termsResults: [],
};

const termsReducer = (state = defaultState, action) => {
    switch (action.type) {

        case actionTypes.GET_SEARCH_TERMS_INITIATE:
            return {
                ...state,
                termsInitiated: true
            };

        case actionTypes.GET_SEARCH_TERMS_SUCCESS:
            return {
                ...state,
                termsInitiated: false,
                termsSuccess: true,
                termsFailed: false,
                termsResults: action.data
            };

        case actionTypes.GET_SEARCH_TERMS_FAIL:
            return {
                ...state,
                termsInitiated: false,
                termsSuccess: false,
                termsFailed: true
            };

        default:
            return state
    }
};

module.exports = {
    TERMS: termsReducer
};