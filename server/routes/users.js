const express = require("express"),
  Users = require("./../models/users"),
  router = express.Router();

router.post("/", (req, res) => {
  const user = new Users(req.body);
  user
    .save()
    .then(response => user.generateAuthToken())
    .then(token => {
      res.header("X-Auth-Token", token).send(user);
    })
    .catch(e => {
      if (e.code === 11000) {
        res.status(409).send("User already exists");
      } else if (e.name === "ValidationError") {
        res.status(500).send(e.message);
      }
    });
});

router.get("/", (req, res) => {
  Users.find().then(
    users => {
      res.send(users);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

router.post("/authentication", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then(user => {
      user.comparePassword(req.body.password).then(bool => {
        if (bool) {
          user.generateAuthToken().then(token => {
            res.header("X-Auth-Token", token).send(user);
          });
        } else {
          res.status(400).send("Username or password is incorrect");
        }
      });
    })
    .catch(e => res.status(400).send("Username or password is incorrect"));
});

router.get("/me", (req, res) => {
  let token = req.header("X-Auth-Token");
  Users.findByToken(token)
    .populate("following")
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.patch("/following", (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.body._id },
    { $push: { following: req.body.follow } },
    { new: true }
  )
    .then(post => res.send(post))
    .catch(e => res.status(400).send(e));
});

router.get("/suggestions/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      Users.find({ _id: { $nin: [req.params.id, ...user.following] } })
        .then(users => {
          if (!users) {
            return Promise.reject();
          }
          res.send(users);
        })
        .catch(e => {
          Promise.reject();
        });
    })
    .catch(err => {
      res.status(404).send("Unable to get data");
    });
});

module.exports = router;
