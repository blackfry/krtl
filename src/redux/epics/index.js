import { combineEpics } from 'redux-observable';
import {
    getVideosEpic,
    getSearchTermsEpic,
    getStatsEpic
} from '../epics/search';

export default combineEpics(
    getVideosEpic,
    getSearchTermsEpic,
    getStatsEpic,
);
