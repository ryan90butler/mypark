import axios from 'axios';
import {GET_USER} from '../Actions/constraints';

export function getUser(){
  const payload = axios.get('/api/user-data');
  return {
    type: GET_USER,
    payload
}
}

export function addToParks(){
  const payload = axios.get('/api/park-data');
  return {
    type: GET_USER,
    payload
}
}