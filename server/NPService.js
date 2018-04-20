const axios = require('axios');

function getPark(state){
  let nps = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&fields=images%2CoperatingHours%2Caddresses&api_key=${process.env.NPS_API_KEY}`;
  return axios.get(nps)
    .then(r => {
      return r.data
    })
    .catch(error => {
      console.warn(error)
    })
}

function parkDetail(park){
  let nps = `https://developer.nps.gov/api/v1/parks?parkCode=${park}&fields=images%2Caddresses%2CentrancePasses%2Ccontacts%2CentranceFees%2CoperatingHours&api_key=${process.env.NPS_API_KEY}`
  return axios.get(nps)
  .then(r => {
    return r.data
  })
  .catch(error => {
    console.warn(error)
  })
}

module.exports ={
  getPark,
  parkDetail
}