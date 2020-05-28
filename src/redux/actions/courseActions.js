import * as types from "./actionTypes";
import * as courseApi from '../../api/courseApi';

export function LoadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses};
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

// redux thunk
export function loadCourses() {
  return function(dispatch) {
    return courseApi.getCourses().then(courses => {
      dispatch(LoadCoursesSuccess(courses))
    }).catch(error => {
      console.log('Error Occured:', error);
      throw error;
    })
  }
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    return courseApi.saveCourse(course)
    .then(savedCourse => {
      course.id 
      ? dispatch(updateCourseSuccess(savedCourse))
      : dispatch(createCourseSuccess(savedCourse))
    })
    .catch(error => {
      throw error;
    })
  }
}