import axios from 'axios';
import {GET_USER} from '../Actions/constraints';

export function getUser(){
  const payload = axios.get('/api/user-data')
    .then(({data})=> data)
  return {
    type: GET_USER,
    payload
  }
}