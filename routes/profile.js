const { Router } = require('express');
const User = require('./../models/user');
const router = Router();

router.get('/edit', (req, res) => {
  res.render('edit');
});

module.exports = router;
