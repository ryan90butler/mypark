const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const {getPark, parkDetail} = require('./server/NPService');
const {getMap} = require('./server/MapService');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log('db is connected');
        app.set('db', db);
    })
    .catch(err => {
        console.warn('Failed to connect:');
        console.error(err);
    });
    app.use(checkDb());

    app.use(session({
        name: 'MyPark',
        secret: process.env.SESSION_SECRET,
        cookie: {
            expires:  5 * 24 * 60 * 60 *1000,
        },
        saveUninitialized: false,
        rolling: true,
        resave: false,
    }));

app.get('/api/parks',(req,res) => {
    getPark(req.query.state)
        .then(r => {
        res.send(r).status(200);
    })
    });
app.get('/api/park-details/:id',(req,res) => {
        parkDetail(req.params.id)
          .then(r => {
            res.send(r).status(200);
        })
        .catch(err=>{
            throw err;
        })
    });
app.post('/api/park-map',(req,res) => {
    const destination = req.body.destination;
    const origin = req.body.origin;
    getMap(destination, origin)
       .then(r=>{
           res.send(r)
       })
       .catch(err=>{
           throw err;
       })
        });
app.post('/api/login', (req, res) => {
      const { email, password } = req.body;

      req.db.users.findOne({ email, password })
          .then(user => {
              if (!user) {
                  return res.status(401).send({ success: false, message: 'it did not work' });
              }
              req.session.user = user.id
              res.send({ success: true, message: 'Logged in successfully' });
          })
          .catch(err=>{
            console.log("invalid credentials")
          });
    });

app.post('/api/register', (req, res) => {
      const { email, password, firstName, lastName, city, state, zip } = req.body;

     password = bcrypt.hashSync(password, bcrypt.genSaltSync(15));
        req.db.users.insert({firstname:firstName, lastname:lastName, email, password,  city, state, zip })
        .then(user => {
        req.session.user = user.id
            res.send({ success: true, message: 'logged in successfully' });
        })
          .catch(err =>{
            throw err;
            }
        );
    });

// app.put(`/api/update-user`,(req,res) =>{
//     const { email, password, firstName, lastName, city, state, zip } = req.body;
//     req.db.users.update({firstName, lastName, email, password,  city, state, zip})
//     .then(updatedUser => {
//         res.send(updatedUser)
//     })
// })
app.get(`/api/logout`, (req, res) =>{
        req.session.destroy();
        res.send({ success: true, message: 'Logged out successfully' });
    })
app.get('/api/user-data', (req, res) => {
        req.db.getUserInfo([req.session.user])
        .then(r => {
        res.send(r)
        })
    });
app.post(`/api/park-data`, (req,res) =>{
        const userid = req.session.user;
        const {parkid} = req.body;

        req.db.user_parks.insert({parkid, userid})
        .then((r)=>{
            return  req.db.parks.find({parkid});
        })
        .then(r=>{
            if(r.length <= 0){
                return req.db.parks.insert({parkid})
            }
        })
        .then(()=>{
            res.send('Park Added')
        })
        .catch((err)=>{
            throw err;
        })
    })
app.get(`/api/myparks`,(req,res)=>{
    const userid = req.session.user;
   req.db.fetchParks({userid})
   .then(parks =>{
    const promises = parks.map(park=>{
      const parkId= park.parkid
     return parkDetail(parkId)
    })
   return Promise.all(promises)
   })
   .then(parksData =>{
       res.send(parksData)
   })
    })
app.get(`/api/get-comments/:id`, (req,res)=>{
   const parkid = req.params.id
    req.db.reviews.find({parkid})
        .then(allComments =>{
            res.send(allComments)
        })
    })

app.post(`/api/add-comment`,(req,res)=>{
    const userId = req.session.user;
    const parkid = req.body.parkCode;
    const title = req.body.commentTitle;
    const description = req.body.comments;

    req.db.addComment({userId, parkid, title, description})
        .then((r)=>{
           return req.db.reviews.find({parkid})
        })
        .then(data => {
            res.send(data)

        })
        .catch((err)=>{
            throw err;
        })

    })
app.delete(`/api/remove/:id`,(req,res)=>{
    req.db.removePark({parkId: req.params.id, userId: req.session.user})
        .then(newProperties =>{
            console.log('successfully removed')
            const userid = req.session.user;
            req.db.fetchParks({userid})
            .then(parks =>{
             const promises = parks.map(park=>{
               const parkId= park.parkid
              return parkDetail(parkId)
             })
            return Promise.all(promises)
            })
            .then(parksData =>{
                res.send(parksData)
            })
        })
    })
function checkDb() {
        return (req, res, next) => {
            const db = app.get('db');
                if (db) {
                req.db = db;
                next();
                }
        else {
            res.status(500).send({ message: 'this died' });
            }
        };
    };

const port = process.env.PORT || 8080
app.listen(port,()=>{
  console.log(`Server listening on port ${port}`)
} )