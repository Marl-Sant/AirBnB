const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")
const router = express.Router();



router.get('/current', requireAuth, async(req, res, next)=> {
    const allBookings = await Booking.findAll({
        where:{
            userId: req.user.id
        },
        attributes:{
            include: [[sequelize.literal(
                `(SELECT imageURL
                FROM SpotImages
                WHERE spotId = Spot.id AND previewImage = true)`
            ), "previewImage"]]
        }})

        res.json(allBookings)
})

module.exports = router;
