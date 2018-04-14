import {GET_USER} from './Actions/constraints';
import {getUser} from './Actions/action';

function getUserInfo (state={},action){
  switch(action.type){
    case `${GET_USER}_PENDING`:
    return state;
    case `${GET_USER}_FULFILLED`:
    return state = action.payload.data;
    case `${GET_USER}_REJECTED`:
    return [`It didn't work`];
    default:
    return state;
  }
}

const rootReducer = getUserInfo;
export default rootReducer;