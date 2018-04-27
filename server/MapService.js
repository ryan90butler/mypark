const axios = require("axios");

function getMap(destination, origin) {
  let map = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination.replace(/\s/g, '+')}&key=${
    process.env.GOOGLE_MAPS_API_KEY
  }`;

  return axios
    .get(map)
    .then(r => {
      return r.data;
    })
    .catch(error => {
      console.warn(error);
    });
}
module.exports = {
  getMap
};
