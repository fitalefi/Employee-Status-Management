const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// Register user
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email
      });

      await user.save();

      // Return jsonwebtoken

      const payload = {
        user: {
          email: user.email,
          id: user.id
        }
      };
      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({
          token: token,
          email: email,
          name: name,
          status: user.status
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server error');
    }
  }
);

router.post('/updateStatus', auth, async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User do not exists' }] });
    }
    const userFields = {
      status: req.body.status,
      name: req.body.name
    };

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userFields },
      { new: true }
    );

    return res.json(user);
  } catch (err) {}
});

// get all profiles
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/statues_to_display', (req, res) => {
  res.send(['Working', 'OnVacation', 'LunchTime', 'BusinessTrip']);
});

module.exports = router;
