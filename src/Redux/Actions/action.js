import axios from 'axios';
import {GET_USER, ADD_TO_MY_PARKS} from '../Actions/constraints';

export function getUser(){
    const payload = axios.get('/api/user-data');
    return {
    type: GET_USER,
    payload
    }
  }

export function addToMyParks(parkid){
    const payload = axios.post('/api/park-data', {parkid});
    return {
      type: ADD_TO_MY_PARKS,
      payload
    }
  }