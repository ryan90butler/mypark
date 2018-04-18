import {GET_USER,ADD_TO_MY_PARKS} from './Actions/constraints';
import { combineReducers } from 'redux';

function userInfo (state=[],action){
  switch(action.type){
    case `${GET_USER}_FULFILLED`:
    return state = action.payload.data;
    case `${GET_USER}_REJECTED`:
    return [`It didn't work`];
    default:
    return state;
  }
}

// function

const rootReducer = combineReducers({userInfo})

export default rootReducer;