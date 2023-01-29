const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")
const router = express.Router();


router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const {startDate, endDate} = req.body
    const testStartDate = new Date(startDate)
    const testEndDate = new Date(endDate)
    
    const doIExist = await Booking.findByPk(req.params.bookingId)
    if (!doIExist) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    const spotIdForBookedSpot = doIExist.dataValues.id
    
    const allBookingsForSpot = await Booking.findAll({where:{spotId: spotIdForBookedSpot}})

    for(let booking of allBookingsForSpot){
        let approvedEndDate = new Date(booking.dataValues.endDate)
        let approvedStartDate = new Date(booking.dataValues.startDate)
        if (approvedEndDate >= testStartDate && approvedStartDate <= testEndDate){
            res.status(403)
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: [
                  "Start date conflicts with an existing booking",
                  "End date conflicts with an existing booking"
                ]
              })
        }
        
    }

    const editThisBooking = await Booking.findOne({
        where:
            { [Op.and]: [{ id: req.params.bookingId }, { userId: req.user.id }] }
    })
    const hasThisBookingPassed = new Date(editThisBooking.endDate)
    const today = new Date ()
    console.log(today, hasThisBookingPassed)
    if(hasThisBookingPassed.getTime() < today.getTime()){
        res.status(403)
        return res.json(
            {
                message: "Past bookings can't be modified",
                statusCode: 403
              }
        )
    }

    editThisBooking.startDate = startDate
    editThisBooking.endDate = endDate
    editThisBooking.save()

    res.json(editThisBooking)
})

router.get('/current', requireAuth, async (req, res, next) => {
    const allBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    })

    for(let booking of allBookings){
        const previewPic = await SpotImage.findOne({where:{spotId: booking.Spot.id, previewImage: true}})
        if (previewPic){
            booking.Spot.dataValues.previewImage = previewPic.imageURL
        }else{
            booking.Spot.dataValues.previewImage = "No Preview Image"
        }
    }

    res.json(allBookings)
})


module.exports = router;
