import * as actionTypes from '../actionTypes';

let defaultState = {

    // SAVE FAVOURITE
    saveInitiated: null,
    saveSuccess: null,
    saveFailed: null,

    // LOAD SAVED
    loadSavedInitiated: null,
    loadSavedSuccess: null,
    loadSavedFailed: null,

    savedResults: [
        {
             kind: '',
             etag: '',
             id: {
                 kind: '',
                 videoId: ''
             },
             snippet: {
                 publishedAt: '',
                 channelId: '',
                 title: '',
                 description: '',
                 thumbnails: {
                     default: {
                         url: '',
                         width: 120,
                         height: 90
                     },
                     medium: {
                         url: '',
                         width: 320,
                         height: 180
                     },
                     high: {
                         url: '',
                         width: 480,
                         height: 360
                     }
                 },
                 channelTitle: '',
                 liveBroadcastContent: ''
             },
             statistics: {
                viewCount: "",
                likeCount: ""
            },
         },
    ],
};

// add all objects in local storage to an array, that have key 'etag'
// as - this is a shorthand to identifying saved yt video objs
const returnSavedFavourites = () => {
    let savedResults = [];
    if(localStorage) {
        for (let i in localStorage) {
            let storageItem = JSON.parse(localStorage.getItem(i));
            if (storageItem.hasOwnProperty('etag')) {
                savedResults.push(storageItem)
            }
        }
    }

    return savedResults
};


const savedReducer = (state = defaultState, action) => {
    switch (action.type) {

        case actionTypes.LOAD_SAVED_INITIATE:
            return {
                ...state,
                loadSavedInititated: true,
                loadSavedSuccess: false,
                loadSavedFailed: false
            };

        case actionTypes.LOAD_SAVED_SUCCESS:
            return {
                ...state,
                loadSavedInititated: false,
                loadSavedSuccess: true,
                loadSavedFailed: false,
                savedResults: returnSavedFavourites()
            };

        case actionTypes.LOAD_SAVED_FAIL:
            return {
                ...state,
                loadSavedInititated: false,
                loadSavedSuccess: false,
                loadSavedFailed: true
            };

        case actionTypes.SAVE_VIDEO_INITIATE:
            // saving a video to localstorage happens here and is
            // initiated by dispatching the save video action creator
            // this deviated from the normal init --> success/fail workflow
            let savedObj = action.params;
                if(localStorage) {
                    localStorage.setItem(savedObj.id.videoId, JSON.stringify(savedObj))
                }

            return {
                ...state,
                savedInititated: true,
                savedSuccess: true,
                loadSavedFailed: false,
                savedResults: returnSavedFavourites()
            };

        default:
            return state
    }
};

module.exports = {
    SAVED: savedReducer
};