const axios = require('axios');

// const npsUrl=`https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=${process.env.NPS_API_KEY}`

function getPark(state){
  let nps = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${process.env.NPS_API_KEY}`;
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
}