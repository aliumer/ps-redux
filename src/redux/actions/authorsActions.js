import * as types from "./actionTypes";
import * as authorApi from '../../api/authorApi';


export function LoadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

// redux thunk
export function loadAuthors() {
  return function (dispatch) {
    return authorApi.getAuthors().then(authors => {
      dispatch(LoadAuthorsSuccess(authors))
    }).catch(error => {
      console.log('Error Occured:', error);
      throw error;
    })
  }
}