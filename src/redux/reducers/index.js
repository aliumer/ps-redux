// a route reducer that would compose our course reducers together.

import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const routeReducer = combineReducers({
  courses: courses,
  authors: authors
});

export default routeReducer;