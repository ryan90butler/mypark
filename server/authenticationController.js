module.exports ={
  login:(req, res) => {
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
  },
  register: (req, res) => {
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
  },
  updateUser: (req, res) => {
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
  },
  logout: (req, res) => {
    req.session.destroy();
    res.send({ success: true, message: "Logged out successfully" });
  },
  userData: (req, res) => {
    req.db.getUserInfo([req.session.user]).then(r => {
      res.send(r);
    });
  }
}