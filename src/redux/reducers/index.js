// a route reducer that would compose our course reducers together.

import { combineReducers } from 'redux';
import courses from './courseReducer';

const routeReducer = combineReducers({
  courses: courses
});

export default routeReducer;