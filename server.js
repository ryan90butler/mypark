const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

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


    app.post('/api/login', (req, res) => {
      const { email, password } = req.body;

      req.db.user_table.findOne({ email, password })
          .then(user => {
              if (!user) {
                  return res.status(401).send({ success: false, message: 'it did not work' });
              }
              req.session.user = user.user_id
              res.send({ success: true, message: 'Logged in successfully' });
          })
          .catch(err=>{
            console.log("invalid credentials")
          });
    });

    app.post('/api/register', (req, res) => {
      const { email, password } = req.body;

      req.db.user_table.insert({ email, password })
          .then(user => {
            req.session.user = user.user_id
              res.send({ success: true, message: 'logged in successfully' });
          })
          .catch(err =>{
            console.log(err)
          }

          );
    });


const port = process.env.PORT || 8080
app.listen(port,()=>{
  console.log(`Server listening on port ${port}`)
} )