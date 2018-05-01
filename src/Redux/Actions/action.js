import axios from 'axios';
import {GET_USER, ADD_TO_MY_PARKS, GET_DETAILS, ADD_COMMENTS, GET_COMMENTS, REMOVE_COMMENT, PARK_ID} from '../Actions/constraints';

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
export function getParkDetails(parkid){
    const payload = axios.get(`/api/park-details/${parkid}`, {parkid});
    return {
      type: GET_DETAILS,
      payload
    }
  }

  export function addParkComments(comments, commentTitle, parkCode){
    const payload = axios.post(`/api/add-comment`,{
      comments, commentTitle, parkCode
    })
    return{
      type: ADD_COMMENTS,
      payload
    }
  }
  export function getParkComments(id){
    const payload = axios.get(`/api/get-comments/`+ id)
    return{
      type: GET_COMMENTS,
      payload
    }
  }
  export function removeComments(id, parkid){
   const payload = axios.delete(`/api/remove-comment/`+ id,{data: {park: parkid}})
    return{
      type: REMOVE_COMMENT,
      payload
    }
  }
  export function getParkId(){
   const payload = axios.get(`/api/park-id-list/`)
    return{
      type: PARK_ID,
      payload
    }
  }
