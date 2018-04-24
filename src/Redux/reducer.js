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

function myParkAdd (state='',action){
  switch(action.type){
    case`${ADD_TO_MY_PARKS}_FULFILLED`:
    return [
      ...state, {
      action: action.payload.data,
      added: true

      }
    ]
    case`${ADD_TO_MY_PARKS}_REJECTED`:
    return ['Failed to work'];
    default:
    return state;
  }

}

const rootReducer = combineReducers({userInfo, myParkAdd})

export default rootReducer;