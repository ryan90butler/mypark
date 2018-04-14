import {GET_USER} from './Actions/constraints';
import {getUser} from './Actions/action';
import { combineReducers } from 'redux';

function userInfo (state=[],action){
  return state;
  // switch(action.type){
  //   case `${GET_USER}_PENDING`:
  //   return state;
  //   case `${GET_USER}_FULFILLED`:
  //   return state = action.payload.data;
  //   case `${GET_USER}_REJECTED`:
  //   return [`It didn't work`];
  //   default:
  //   return state;
  // }
}

const rootReducer = combineReducers({userInfo})

export default rootReducer;