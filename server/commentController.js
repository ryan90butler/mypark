module.exports={
  addComment: (req, res) => {
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
  },
  getComments: (req, res) => {
    const parkid = req.params.id;
    req.db
      .getComments({ parkid })
      .then(allComments => {
        res.send(allComments);
      })
      .catch(err => {
        throw err;
      });
  },
  deleteComments: (req, res) => {
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
  }
}