import * as actionTypes from '../actionTypes';

let defaultState = {

    // SEARCH
    searchInitiated: null,
    searchSuccess: null,
    searchFailed: null,
    searchPanelOpen: true,
    searchResultsEmpty: null,

    searchResults: [
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

    statsInitiate: null,
    statsSuccess: null,
    statsFail: null,

    statsResult: [
        {
            id: "",
            statistics: {
                viewCount: "",
                likeCount: ""
            }
        }
    ]

};


const searchReducer = (state = defaultState, action) => {
    switch (action.type) {

        case actionTypes.GET_VIDEOS_INITIATE:
            // console.log('search qry init reducer', {action})
            return {
                ...state,
                searchInitiated: true,
                searchSuccess: null
            };

        case actionTypes.GET_VIDEOS_SUCCESS:

            return {
                ...state,
                searchInitiated: false,
                searchSuccess: true,
                searchFailed: false,
                searchResults: action.data,
                searchPanelOpen: false,
                searchResultsEmpty: action.data.length === 0
            };

        case actionTypes.GET_VIDEOS_FAIL:
            return {
                ...state,
                searchInitiated: false,
                searchSuccess: false,
                searchFailed: true
            };

        case actionTypes.GET_STATS_INITIATE:
            // console.log('search qry init reducer', {action})
            return {
                ...state,
                statsInitiated: true
            };

        case actionTypes.GET_STATS_SUCCESS:
        function findElement(array, predicate) {
            for (let [index, element] of array.entries()) { // (A)
                if (predicate(element)) {
                    return {element, index}; // (B)
                }
            }
            return {element: undefined, index: -1};
        }

        function buildSearchObj() {
            let searchResults = state.searchResults;
            let statResult = action.data;
            searchResults.map((result) => {
                let {element} = findElement(statResult, x => x.id === result.id.videoId)
                result.statistics = element.statistics
            });
            return searchResults
        }

            return {
                ...state,
                statsInitiated: false,
                statsSuccess: true,
                statsFailed: false,
                statsResult: action.data,
                searchResults: buildSearchObj()
            };

        case actionTypes.GET_STATS_FAIL:
            return {
                ...state,
                statsInitiated: false,
                statsSuccess: false,
                statsFailed: true
            };

        default:
            return state
    }
};

module.exports = {
    SEARCH: searchReducer
};