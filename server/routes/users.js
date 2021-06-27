const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/middleware");

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
users.get("/", (req, res) => {
  const { id } = req.decode;

  User.where({ id: id })
    .fetch()
    .then((user) => {
      const resUser = { ...user.attributes, password: "", salt: "" };
      res.status(200).json(resUser);
    })
    .catch((err) =>
      res.status(400).json({ message: "Could not retrieve the user", err })
    );
});

users.get("/login/byemail", (req, res) => {
  const { password, email } = req.query;

  User.where({ email: email })
    .fetch()
    .then((user) => {
      const verification = bcrypt.compareSync(
        password,
        user.attributes.password
      );

      if (verification) {
        const userToken = generateToken(
          user.attributes.email,
          user.attributes.name,
          user.attributes.id
        );
        res.status(200).json({ user, token: userToken });
      } else {
        res.status(403).json({ message: "verification failed" });
      }
    })
    .catch((err) => res.status(404).json({ message: "User not registered" }));
});

users.post("/signup/byemail", (req, res) => {
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
