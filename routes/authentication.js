const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

const router = Router();

//SIGN UP

router.get('/sign-up', (req, res) => {
  res.render('authentication/sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;

  //MISSING VERIFY IF IS A VALID PASSWORD

  bcrypt
    .hash(password, 10)
    .then((hashAndSalt) => {
      return User.create({
        username,
        name,
        password: hashAndSalt
      });
    })
    .then((user) => {
      console.log(user);
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

//SIGN IN

router.get('/sign-in', (req, res) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  let user;

  User.findOne({
    username
  })
    .then((document) => {
      user = document;
      return bcrypt.compare(password, user.password);
    })
    .then((comparison) => {
      if (comparison) {
        // CREATE SEASSION
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('PASSWORD_DOES_NOT_MATCH'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
