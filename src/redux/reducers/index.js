// a route reducer that would compose our course reducers together.

import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import apiCallsInProgress from './apiStatusReducer'

const routeReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress
});

export default routeReducer;