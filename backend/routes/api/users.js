// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require('sequelize')
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 15 })
    .withMessage('First name must be between 2 - 15 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 15 })
    .withMessage('Last name must be between 2 - 15 characters long'),
  handleValidationErrors
];

const router = express.Router();

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {

    const { email, password, username, firstName, lastName } = req.body;
    const validUser = await User.findOne({where:{[Op.or]: [{email}, {username}]}})

    if(validUser){
      res.status(403)
      return res.json({message:"User already exists", statusCode: 403, errors:[
        "User with email and/or username already exists"
      ]})
    }
    
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);

module.exports = router;
