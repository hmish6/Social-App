const express = require("express"),
  Posts = require("./../models/posts"),
  router = express.Router();

router.post("/", (req, res) => {
  const post = new Posts(req.body);
  post
    .save()
    .then(() => res.send([post]))
    .catch(e => res.status(400).send(e));
});

router.patch("/like", (req, res) => {
  Posts.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { likes: req.body.like } },
    { new: true }
  )
    .then(post => res.send([post]))
    .catch(e => res.status(400).send(e));
});

router.patch("/comment", (req, res) => {
  Posts.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { comments: req.body.comment } },
    { new: true }
  )
    .then(post => res.send([post]))
    .catch(e => res.status(400).send(e));
});

router.get("/", (req, res) => {
  Posts.find()
    .populate("likes")
    .populate("author")
    .populate({ path: "comments", populate: { path: "author" } })
    .then(
      doc => {
        res.send(doc);
      },
      err => res.status(400).send(err)
    );
});

router.delete("/:id", (req, res) => {
  Posts.findByIdAndRemove(req.params.id)
    .then(post => res.send(post))
    .catch(e => res.status(400).send(e));
});

module.exports = router;
