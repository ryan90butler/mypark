const axios = require('axios');


function getMap(origin, destination){
  let map = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.GOOGLE_API_KEY}`;
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