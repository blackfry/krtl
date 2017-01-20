import * as actionTypes from './actionTypes';

export const getSearchTermsInitiateAction = (params) => {
    return {
        type: actionTypes.GET_SEARCH_TERMS_INITIATE,
        params
    }
};

export const getVideosInitiateAction = (params) => {
    return {
        type: actionTypes.GET_VIDEOS_INITIATE,
        params
    }
};

export const getVideoStatsInitiateAction = (params) => {
    return {
        type: actionTypes.GET_STATS_INITIATE,
        params
    }
};

export const loadSavedFavouritesInitiateAction = () => {
    return {
        type: actionTypes.LOAD_SAVED_SUCCESS,
    }
};

export const saveFavouriteInitiateAction = params => {
    return {
        type: actionTypes.SAVE_VIDEO_INITIATE,
        params
    }
};



