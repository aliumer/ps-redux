import * as types from "./actionTypes";
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from '../actions/apiStatusActions';


export function LoadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

// redux thunk
export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi.getAuthors().then(authors => {
      dispatch(LoadAuthorsSuccess(authors))
    }).catch(error => {
      dispatch(apiCallError(error));
      throw error;
    })
  }
}