// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator');
// const Profile = require('../../models/Profile');
// const User = require('../../models/User');

// // get current user profile
// router.get('/me', auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     if (!profile) {
//       return res.status(400).json({ msg: 'There is no profile for this user' });
//     }

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // create or update user profile
// router.post('/', [
//   auth,
//   [
//     check('status', 'Status is required')
//       .not()
//       .isEmpty()
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const profileFields = {
//       user: req.user.id,
//       status: req.body.status,
//       name: req.user.name
//     };

//     try {
//       let profile = await Profile.findOne({ user: req.user.id });

//       if (profile) {
//         // Update
//         profile = await Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           { new: true }
//         );

//         return res.json(profile);
//       }
//       //Create
//       profile = new Profile(profileFields);
//       await profile.save();
//       return res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// ]);

// // get all profiles
// router.get('/', auth, async (req, res) => {
//   try {
//     const profiles = await Profile.find();
//     res.json(profiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // get profile by user id
// router.get('/user/:user_id', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({ user: req.params.user_id });
//     if (!profile)
//       return res.status(400).json({ msg: 'There is no profile for this user' });
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// router.delete('/', auth, async (req, res) => {
//   try {
//     // remove profile
//     await Profile.findOneAndRemove({ user: req.user.id });

//     // remove user
//     await User.findOneAndRemove({ _id: req.user.id });

//     res.json({ msg: 'User deleted' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// router.get('/fetchStatusToDisplay', (req, res) => {
//   const statues = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'];
//   res.send({ data: statues });
// });

// module.exports = router;
