const express = require('express');
const { Review, ReviewImage } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")
const router = express.Router();

const validateReviewInfo = []

router.post("/:reviewId/reviewImages", requireAuth,  async (req, res, next)=> {

    const review = await Review.findByPk(req.params.reviewId)

    if(!review){
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    //NOT STOPPING IMAGE FROM BEING INSERTED INTO DB
    if(review.userId !== req.user.id){
        res.status(401)
        res.json({
            message: "Operation failed. Must be owner of review to add image",
            statusCode: 401
        })
    }

    const picList = await ReviewImage.findAll({where:{reviewId:req.params.reviewId}})
    if(picList.length > 10){
        res.status(403)
        res.json({message:"Maximum number of images for this resouce was reached", statusCode: 403})
    }
    const {url} = req.body
    const newReviewImage = await ReviewImage.create({
        reviewId: Number(req.params.reviewId),
        imageURL: url
    })

    res.json(newReviewImage)
})





module.exports = router;
