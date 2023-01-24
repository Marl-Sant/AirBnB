const express = require('express');
const { Spot, SpotImage, User } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")
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
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal({ checkFalsy: true })

        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal({ checkFalsy: true })
        .toFloat()
        .withMessage('Latitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .notEmpty()
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal({ checkFalsy: true })
        .toFloat()
        .withMessage('Price is required'),
    handleValidationErrors
];


router.get('/search', async (req, res, next) => {


    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    if (page <= 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Page must be greater than or equal to 1"
            }
        })
    }
    if (size <= 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Size must be greater than or equal to 1"
            }
        })
    }
    if (maxLat > 90) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Maximum latitude is invalid"
            }
        })
    }
    if (minLat < -90) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Minimum latitude is invalid"
            }
        })
    }
    if (minLng < -180) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Minimum longitude is invalid"
            }
        })
    }
    if (maxLng > 180) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Maximum longitude is invalid"
            }
        })
    }
    if (maxPrice < 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Maximum price must be greater than or equal to 0"
            }
        })
    }

    if (!page || isNaN(page) || page > 10) { page = 1 }
    if (!size || isNaN(size) || size > 20) { size = 20 }
    if (!minLat) { minLat = -90 }
    if (!maxLat) { maxLat = 90 }
    if (!minLng) { minLng = -180 }
    if (!maxLng) { maxLng = 180 }
    if (!minPrice) { minPrice = 1 }
    if (!maxPrice) { maxPrice = 100000 }

    const searchedSpots = await Spot.findAll({
        where: {
            lat: { [Op.between]: [minLat, maxLat] },
            lng: { [Op.between]: [minLng, maxLng] },
            price: { [Op.between]: [minPrice, maxPrice] },
        },
        attributes: {
            include: [
                [sequelize.literal(
                    `(SELECT imageURL
                    FROM SpotImages
                    WHERE spotId = Spot.id AND previewImage = true)`
                ), "previewImage"]
            ]
        },
        limit: size,
        offset: (page - 1) * size
    })
    searchedSpots.page = page
    searchedSpots.size = size
    res.status(200).json({ searchedSpots, page, size })
})

router.post('/:spotId/spotImages', requireAuth, async (req, res, next) => {

    const spotLocator = await Spot.findByPk(req.params.spotId)

    if (!spotLocator) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } else {
        if (spotLocator.ownerId === req.user.id) {
            const { url, preview } = req.body

            const freshPic = await SpotImage.create({
                spotId: req.params.spotId,
                imageURL: url,
                previewImage: preview
            })

            res.json({
                id: freshPic.id,
                imageURL: freshPic.imageURL,
                previewImage: freshPic.previewImage
            })
        }
        if (spotLocator.ownerId !== req.user.id) {
            res.status(401).json({ message: "Unauthorized action. Only the spot owner can add new image", status: 401 })
        }
    }

})


router.post('/', validateSpotInfo, requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    res.json(newSpot)
})

router.delete("/:spotId", requireAuth, async (req, res, next) => {
    const toBeDeleted = await Spot.findByPk(req.params.spotId)


    if (toBeDeleted.ownerId === req.user.id) {
        if (toBeDeleted === null) {
            res.status(404)
            res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        if (toBeDeleted) {
            await toBeDeleted.destroy()
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }
    } else {
        res.status(401)
        res.json({
            message: "Operation failed. The current user must be the owner of the spot",
            statusCode: 401
        })
    }
}
)


//returning all the spots owned by current user
router.get('/session', requireAuth, async (req, res, next) => {
    const mySpots = await Spot.findAll({
        where: { ownerId: req.user.id },
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

    if (!mySpots) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    console.log(req.user.id)
    res.json(mySpots)
})


router.get('/:spotId', async (req, res, next) => {

    const foundSpot = await Spot.findOne({
        where: { id: req.params.spotId },
        attributes: {
            include: [
                [sequelize.literal(`(SELECT COUNT(id)
                FROM Reviews WHERE spotId = Spot.id)`), "numOfReviews"],
                [sequelize.literal(`(SELECT AVG(stars)
                FROM Reviews WHERE spotId = Spot.id)`), "avgStarRatings"],
            ],
        },
        include: [{ model: SpotImage, attributes: { exclude: ["spotId"] } }, { model: User, attributes:["id", "firstName", "lastName"], as: "Owner" }]
    })

    if(!foundSpot){
        res.status(404),
        res.json({
            message: "Spot is not found",
            status: 404
        })
    }

    res.json(foundSpot)
})

router.put('/:spotId', validateSpotInfo, requireAuth, async (req, res, next) => {

    const editSpot = await Spot.findByPk(req.params.spotId)
    //checking to see if spot exists
    if (!editSpot) {
        res.status(404)
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    //checking to see if current user is owner
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
    }
    else {
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
