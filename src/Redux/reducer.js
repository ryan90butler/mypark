import {GET_USER,ADD_TO_MY_PARKS, GET_DETAILS, ADD_COMMENTS, GET_COMMENTS, REMOVE_COMMENT} from './Actions/constraints';
import { combineReducers } from 'redux';

function userInfo (state=[],action){
  switch(action.type){
    case `${GET_USER}_FULFILLED`:
    return action.payload.data;
    case `${GET_USER}_REJECTED`:
    return [`It didn't work`];
    default:
    return state;
  }
}

function myParkAdd (state=[],action){
  switch(action.type){
    case`${ADD_TO_MY_PARKS}_FULFILLED`:
    return action.payload.data;
    case`${ADD_TO_MY_PARKS}_REJECTED`:
    return ['Failed to work'];
    default:
    return state;
  }
}

function parkDetail (state='',action){
  switch(action.type){
    case`${GET_DETAILS}_FULFILLED`:
    return action.payload.data;
    case`${GET_DETAILS}_REJECTED`:
    return ['Failed to work'];
    default:
    return state;
  }
}

function parkComments (state=[],action){
  switch(action.type){
    case`${GET_COMMENTS}_FULFILLED`:
    case`${ADD_COMMENTS}_FULFILLED`:
    case`${REMOVE_COMMENT}_FULFILLED`:
      return action.payload.data;
    case`${ADD_COMMENTS}_REJECTED`:
    return ['Failed to work'];
    default:
    return state;
  }
}

const rootReducer = combineReducers({userInfo, myParkAdd, parkDetail, parkComments})

export default rootReducer;