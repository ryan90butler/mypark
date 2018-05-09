const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");

require("dotenv").config({ path: __dirname + "/.env" });

const { getPark, parkDetail, parkCampgrounds } = require("./service/NPService");
const { getMap } = require("./service/MapService");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/build')));

massive(process.env.DATABASE_URL)
  .then(db => {
    console.log("db is connected");
    app.set("db", db);
  })
  .catch(err => {
    console.warn("Failed to connect:");
    console.error(err);
  });
app.use(checkDb());

app.use(
  session({
    name: "MyPark",
    secret: process.env.SESSION_SECRET,
    cookie: {
      expires: 5 * 24 * 60 * 60 * 1000
    },
    saveUninitialized: false,
    rolling: true,
    resave: false
  })
);

app.get("/api/parks", (req, res) => {
  getPark(req.query.state).then(r => {
    res.send(r).status(200);
  });
});
app.get("/api/park-details/:id", (req, res) => {
  parkDetail(req.params.id)
    .then(r => {
      res.send(r).status(200);
    })
    .catch(err => {
      throw err;
    });
});
app.post("/api/park-map", (req, res) => {
  const destination = req.body.destination;
  const origin = req.body.origin;
  getMap(destination, origin)
    .then(r => {
      res.send(r);
    })
    .catch(err => {
      throw err;
    });
});

app.get(`/api/campgrounds/:id`, (req, res) => {
  parkCampgrounds(req.params.id)
    .then(campgrounds => {
      res.send(campgrounds).status(200);
    })
    .catch(err => {
      throw err;
    });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  req.db.users
    .findOne({ email, password })
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "it did not work" });
      }
      req.session.user = user.id;
      res.send({ success: true, message: "Logged in successfully" });
    })
    .catch(err => {
      console.log("invalid credentials");
    });
});

app.post("/api/register", (req, res) => {
  const { email, password, firstName, lastName, city, state, zip } = req.body;

  req.db.users
    .insert({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      city,
      state,
      zip
    })
    .then(user => {
      req.session.user = user.id;
      res.send({ success: true, message: "logged in successfully" });
    })
    .catch(err => {
      throw err;
    });
});

app.put(`/api/update-user`, (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    city,
    state,
    zip,
    id
  } = req.body;

  req.db
    .updateUser({ firstName, lastName, email, password, city, state, zip, id })
    .then(updatedUser => {
      res.send(updatedUser);
    });
});
app.get(`/api/logout`, (req, res) => {
  req.session.destroy();
  res.send({ success: true, message: "Logged out successfully" });
});
app.get("/api/user-data", (req, res) => {
  req.db.getUserInfo([req.session.user]).then(r => {
    res.send(r);
  });
});
app.post(`/api/park-data`, (req, res) => {
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
});

app.get(`/api/park-id-list`, (req, res) => {
  const userId = req.session.user;
  return req.db.getParkId({ userId }).then(parkId => {
    res.send(parkId);
  });
});
app.get(`/api/myparks`, (req, res) => {
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
});
app.get(`/api/get-comments/:id`, (req, res) => {
  const parkid = req.params.id;
  req.db
    .getComments({ parkid })
    .then(allComments => {
      res.send(allComments);
    })
    .catch(err => {
      throw err;
    });
});

app.post(`/api/add-comment`, (req, res) => {
  const userId = req.session.user;
  const parkid = req.body.comments.parkCode;
  const title = req.body.comments.commentTitle;
  const description = req.body.comments.comments;

  req.db
    .addComment({ userId, parkid, title, description })
    .then(r => {
      return req.db.reviews.find({ parkid });
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      throw err;
    });
});
app.delete(`/api/remove-comment/:id`, (req, res) => {
  req.db.deleteComment(req.params.id).then(r => {
    const parkid = req.body.park;
    req.db
      .getComments({ parkid })
      .then(allComments => {
        res.send(allComments);
      })
      .catch(err => {
        throw err;
      });
  });
});
app.delete(`/api/remove/:id`, (req, res) => {
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
});
function checkDb() {
  return (req, res, next) => {
    const db = app.get("db");
    if (db) {
      req.db = db;
      next();
    } else {
      res.status(500).send({ message: "this died" });
    }
  };
}

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on port ${this.address().port}`);
});