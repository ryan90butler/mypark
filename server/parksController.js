const { getPark, parkDetail, parkCampgrounds } = require("../service/NPService");
const { getMap } = require("../service/MapService");

module.exports ={
  parks: (req, res) => {
    getPark(req.query.state).then(r => {
      res.send(r).status(200);
    });
  },
  parkDetails: (req, res) => {
    parkDetail(req.params.id)
      .then(r => {
        res.send(r).status(200);
      })
      .catch(err => {
        throw err;
      });
  },
  parkMap: (req, res) => {
    const destination = req.body.destination;
    const origin = req.body.origin;
    getMap(destination, origin)
      .then(r => {
        res.send(r);
      })
      .catch(err => {
        throw err;
      });
  },
  campgrounds:  (req, res) => {
    parkCampgrounds(req.params.id)
      .then(campgrounds => {
        res.send(campgrounds).status(200);
      })
      .catch(err => {
        throw err;
      });
  },
  removePark: (req, res) => {
    req.db
      .removePark({ parkId: req.params.id, userId: req.session.user })
      .then(newProperties => {
        const userid = req.session.user;
        req.db
          .fetchParks({ userid })
          .then(parks => {
            const promises = parks.map(park => {
              const parkId = park.parkid;
              return parkDetail(parkId);
            });
            return Promise.all(promises);
          })
          .then(parksData => {
            res.send(parksData);
          })
          .catch(err => {
            throw err;
          });
      });
  },
  myParkList: (req, res) => {
    const userid = req.session.user;
    req.db
      .fetchParks({ userid })
      .then(parks => {
        const promises = parks.map(park => {
          const parkId = park.parkid;
          return parkDetail(parkId);
        });
        return Promise.all(promises);
      })
      .then(parksData => {
        res.send(parksData);
      });
  },
  parkData:  (req, res) => {
    const userid = req.session.user;
    const parkid = req.body.parkid;

    req.db.user_parks
      .insert({ parkid, userid })
      .then(r => {
        return req.db.parks.find({ parkid });
      })
      .then(r => {
        if (r.length <= 0) {
          return req.db.parks.insert({ parkid });
        }
      })
      .then(() => {
        return req.db
          .fetchParks({ userid })
          .then(parks => {
            res.send(parks);
          })
          .catch(err => {
            throw err;
          });
      });
  },
  parkIdList: (req, res) => {
    const userId = req.session.user;
    return req.db.getParkId({ userId }).then(parkId => {
      res.send(parkId);
    });
  }
}