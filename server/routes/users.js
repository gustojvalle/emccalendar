const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const hashPassword = async (passphrase) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const password = await bcrypt.hash(passphrase, salt);
  return { salt, password };
};

const verifyEmail = async (email) => {
  const user = await User.where({ email: email }).fetch();
  if (user) {
    return true;
  } else {
    return false;
  }
};

const users = express.Router();
users.get("/:userId", (req, res) => {
  const { userId } = req.params;
  User.where({ id: userId })
    .fetch()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(400).json({ message: "Could not retrieve the user", err })
    );
});

users.get("/login/byemail", (req, res) => {
  const { password, email } = req.body;

  User.where({ email: email })
    .fetch()
    .then((user) => {
      const verification = bcrypt.compareSync(
        password,
        user.attributes.password
      );

      if (verification) {
        res.status(200).json({ user });
      } else {
        res
          .status(403)
          .json({ message: "verification failed, user not logged in" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "internal error, failed to log in" })
    );
});

users.post("/", (req, res) => {
  const { body } = req;

  let newUser = { ...body };

  verifyEmail(newUser.email)
    .then((user) =>
      res.status(400).json({ message: "email already registered" })
    )
    .catch((_err) => {
      hashPassword(newUser.password)
        .then((hashes) => {
          newUser = { ...newUser, ...hashes };

          new User(newUser)
            .save()
            .then((newAddedUser) => res.status(200).json(newAddedUser));
        })
        .catch((err) =>
          res.status(400).json({ message: "unable to save user", err })
        );
    });
});

module.exports = users;
