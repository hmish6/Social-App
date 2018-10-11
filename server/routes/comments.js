const express = require("express"),
  Comments = require("./../models/comments"),
  router = express.Router();

router.post("/", (req, res) => {
  const comment = new Comments(req.body);
  comment
    .save()
    .then(() => res.send(comment))
    .catch(e => res.status(400).send(e));
});

router.get("/", (req, res) => {
  Comments.find()
    .populate("author")
    .then(doc => res.send(doc), err => res.status(400).send(err));
});

module.exports = router;
