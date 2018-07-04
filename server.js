const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const path = require("path");
const nodemailer = require('nodemailer');
require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
//middleware setup
const middleware = require('./server/middleWare');
const authenticate =  require('./server/authenticationController.js');
const parksController = require('./server/parksController');
const commentController = require('./server/commentController');

massive(process.env.DATABASE_URL)
  .then(db => {
  console.log("db is connected");
  app.set("db", db);
  })
  .catch(err => {
  console.warn("Failed to connect:");
  console.error(err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/build')));
app.use(middleware.checkDb(app));
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
//authentication endpoints
app.post("/api/login", authenticate.login);
app.post("/api/register", authenticate.register);
app.put(`/api/update-user`, authenticate.updateUser);
app.get(`/api/logout`, authenticate.logout);
app.get("/api/user-data", authenticate.userData);
//parks endpoints
app.get("/api/parks", parksController.parks);
app.get("/api/park-details/:id", parksController.parkDetails);
app.post("/api/park-map", parksController.parkMap);
app.get(`/api/campgrounds/:id`, parksController.campgrounds);
app.delete(`/api/remove/:id`, parksController.removePark);
app.get(`/api/myparks`, parksController.myParkList );
app.post(`/api/park-data`, parksController.parkData);
app.get(`/api/park-id-list`, parksController.parkIdList);
//comments endpoints
app.get(`/api/get-comments/:id`, commentController.getComments);
app.post(`/api/add-comment`, commentController.addComment);
app.delete(`/api/remove-comment/:id`, commentController.deleteComments);

//server port

app.post(`/emailSend`, (req,res)=>{
  const output = `
  <p>Does this email work?</p>
  <h3>Contact Info</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>email: ${req.body.email}</li>
  </ul>
  <h3>Message:</h3>
  <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'b6utle5r@gmail.com',// generated ethereal user
        pass: 'rebutler65!'// generated ethereal password
    },
    tls:{
      rejectUnauthorized: false
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"MyParks" <b6utle5r@gmail.com>', // sender address
    to: 'ryan90butler@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('message sent')
});
})

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`Server listening on port ${this.address().port}`);
});