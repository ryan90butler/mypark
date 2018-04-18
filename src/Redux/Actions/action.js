import axios from 'axios';
import {GET_USER, ADD_TO_MY_PARKS} from '../Actions/constraints';

export function getUser(){
  const payload = axios.get('/api/user-data');
  return {
    type: GET_USER,
    payload
}
}

export function parkData(){
  const payload = axios.get('/api/park-data');
  return {
    type: ADD_TO_MY_PARKS,
    payload
}
}