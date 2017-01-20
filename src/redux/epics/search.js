import * as actionTypes from '../actionTypes';
import { Observable } from 'rxjs/Observable';
import { categoriesWithIds, YoutubAPIKey } from '../constants';


const getVideoCategoryId = categoryString => {
    let arr = [];
    if(typeof categoryString !== 'undefined') {
        categoriesWithIds.map((id) => {
            if(id.Category === categoryString) {
                arr.push(id.ID)
            }
        });
    }

    return arr[0]
};

const getSearchParams = payload => {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=YoutubAPIKey&part=snippet&type=video&maxResults=10'
    let videoCategoryId = getVideoCategoryId(payload.params.videoCategory);
    url += '&videoCategoryId=' + videoCategoryId;

    if(typeof payload.params.searchQuery !== 'undefined') {
        url += '&q=' + payload.params.searchQuery
    }

    //TODO: add published date filtering
    //  if(typeof payload.params.publishedBefore !== 'undefined') {
    //     url += '&publishedBefore=' + payload.params.publishedBefore
    // }
    //
    //  if(typeof payload.params.publishedAfter !== 'undefined') {
    //     url += '&publishedAfter=' + payload.params.publishedAfter
    // }

    return {
        method: "GET",
        url: url,
        async: true
    }
};


export const getVideosEpic = action$ => action$
    .ofType(actionTypes.GET_VIDEOS_INITIATE)
    .map(payload => getSearchParams(payload))
    .switchMap((params) =>
        Observable.ajax(params)
            .map(res => res.response)
            .map(response => ({
                type: actionTypes.GET_VIDEOS_SUCCESS,
                data: response.items
                })
            )
            .catch(err => Observable.of({
                type: actionTypes.GET_VIDEOS_FAIL,
                payload: {
                    error: err,
                },
            }))
);

const getStatsParams = payload => {
    let url = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCK2nsUKE3KPu7wiKSdSrNxPN4BtqyqdHU&fields=items(id,statistics(viewCount,likeCount))&part=snippet,statistics';
    let queryString = '';

    payload.data.map((result) => queryString+=result.id.videoId+',');
    return {
        method: "GET",
        url: url + '&id=' + queryString,
        async: true
    }
};

export const getStatsEpic = action$ => action$
    .ofType(actionTypes.GET_VIDEOS_SUCCESS)
    .map(payload => getStatsParams(payload))
    .switchMap((params) =>
        Observable.ajax(params)
            .map(res => res.response)
            .map(response => ({
                type: actionTypes.GET_STATS_SUCCESS,
                data: response.items
                })
            )
            .catch(err => Observable.of({
                type: actionTypes.GET_STATS_FAIL,
                payload: {
                    error: err,
                },
            }))
);

const getTermsParams = payload => {
    let url = "https://suggestqueries.google.com/complete/search?key=AIzaSyCK2nsUKE3KPu7wiKSdSrNxPN4BtqyqdHU&client=youtube&ds=yt&q="
    return {
        method: "GET",
        headers: {
            'Content-Type': "text/plain"
        },
        url: url + payload.params,
        async: true
    }
};

export const getSearchTermsEpic = action$ => action$
    .ofType(actionTypes.GET_SEARCH_TERMS_INITIATE)
    .map(payload => getTermsParams(payload))
    .switchMap((params) =>
        Observable.ajax(params)
            .map(res => res.response)
            .map(response => ({
                type: actionTypes.GET_SEARCH_TERMS_SUCCESS,
                data: response.items
                })
            ).takeUntil(action$.ofType(actionTypes.GET_SEARCH_TERMS_INITIATE))
            .catch(err => Observable.of({
                type: actionTypes.GET_SEARCH_TERMS_FAIL,
                payload: {
                    error: err,
                },
            }))
);

