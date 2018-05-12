module.exports={
  checkDb: (app)=>{ return (req, res, next) => {
    const db = app.get("db");
    if (db) {
      req.db = db;
      next();
    } else {
      res.status(500).send({ message: "this died" });
    }
  };
  }
}