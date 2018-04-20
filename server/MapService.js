const axios = require('axios');


function getMap(state){
  let map = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&callback=initMap`;
  return axios.get(map)
    .then(r => {
      return r.data
    })
    .catch(error => {
      console.warn(error)
    })
}

module.exports ={
  getMap
}