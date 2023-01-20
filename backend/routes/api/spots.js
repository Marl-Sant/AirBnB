const express = require('express');
const { Spot } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpotInfo = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    handleValidationErrors
];



router.put('/:spotId', requireAuth, async (req, res, next) => {

    const editSpot = await Spot.findByPk(req.params.spotId)
    if (!editSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (editSpot.ownerId === req.user.id) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body

        editSpot.address = address
        editSpot.city = city
        editSpot.state = state
        editSpot.country = country
        editSpot.lat = lat
        editSpot.lng = lng
        editSpot.name = name
        editSpot.description = description
        editSpot.price = price

        editSpot.save()
        res.json(editSpot)
    } else {
        res.status(401)
        res.json({
            message: "Operation failed. Must be owner of the spot in order to edit",
            statusCode: 401
        })
    }
})


//get all spots with ratings and preview image
router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.literal(
                    `(SELECT AVG(stars) 
                    FROM Reviews
                    WHERE spotId = Spot.id)`
                ), "avgRating"],
                [sequelize.literal(
                    `(SELECT imageURL
                    FROM SpotImages
                    WHERE spotId = Spot.id AND previewImage = true)`
                ), "previewImage"]
            ]
        }
    })
    res.json(allSpots)
})

module.exports = router;
