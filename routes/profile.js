const { Router } = require('express');
//const globalUser = require('./../middleware/globalUser');
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

//const User = require('./../models/user');
const profileRouter = Router();

profileRouter.get('', routeGuard, (req, res) => {
  res.render('profile');
});

profileRouter.get('/edit', routeGuard, (req, res) => {
  res.render('edit');
});

profileRouter.post('/edit', routeGuard, (req, res) => {
  const name = req.body.name;
  const userid = req.user._id;
  console.log(userid);

  User.find({
    _id: userid
  })
    .then((document) => {
      return User.updateOne({
        name
      });
    })
    .then((userupdated) => {
      res.redirect('/profile');
    })
    .catch((error) => {
      //next(error);
    });
});

module.exports = profileRouter;
