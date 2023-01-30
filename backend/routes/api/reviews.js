const express = require('express');
const { User, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const { ResultWithContext } = require('express-validator/src/chain');
const router = express.Router();


const validateReviewInfo = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review must contain text'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .toFloat()
        .withMessage('Must be a number between 1 to 5'),
    handleValidationErrors
]

router.delete('/:reviewId', requireAuth, async (req, res, next)=> {
    const tobeDeleted = await Review.findByPk(req.params.reviewId)

    if(!tobeDeleted){
        res.status(404)
        res.json({message: "Review couldn't be found", statusCode: 404})
    }

    if(tobeDeleted.userId !== req.user.id){
        res.status(401)
        res.json({message:'Operation failed. Must be the owner of the review to deleted.', statusCode: 401})
    }else{
        await tobeDeleted.destroy()
        res.json({message:"Successfully deleted", statusCode: 200})
    }
})


router.get('/current', requireAuth, async(req, res, next) => {
    const reviews = await Review.findAll({
        where:{
            userId: req.user.id
        },
        include:[{
            model:User,
            attributes:['id', 'firstName', 'lastName']
        }, {
            model:Spot,
            attributes:{
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        },{
            model:ReviewImage,
            attributes: ['id', 'url']
        }]
    })

        
    for(let review of reviews){
        const previewPic = await SpotImage.findOne({where:{spotId: review.Spot.id, previewImage: true}})
        if (previewPic){
            review.Spot.dataValues.previewImage = previewPic.url
        }else{
            review.Spot.dataValues.previewImage = "No Preview Image"
        }
    }


    res.json({Reviews:reviews})
})

router.put('/:reviewId', validateReviewInfo, requireAuth, async (req, res, next)=> {
    
    const reviewToBeEdited = await Review.findByPk(req.params.reviewId)

    if(!reviewToBeEdited){
        res.status(404)
        res.json({message: 'Review was not found', statusCode:404})
    }

    if(reviewToBeEdited.userId !== req.user.id){
    res.status(403)
    res.json({message: 'Operation failed. Current user must be the owner of review'})
        }else{
            const {review, stars} = req.body

            reviewToBeEdited.review = review
            reviewToBeEdited.stars = stars

            reviewToBeEdited.save()

            res.json(reviewToBeEdited)
        }
})


router.post("/:reviewId/images", requireAuth,  async (req, res, next)=> {

    const review = await Review.findByPk(req.params.reviewId)

    if(!review){
        res.status(404)
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if(review.userId !== req.user.id){
        res.status(401)
        res.json({
            message: "Operation failed. Must be owner of review to add image",
            statusCode: 401
        })
    }
    
    const picList = await ReviewImage.findAll({where:{reviewId:req.params.reviewId}})
    if(review.userId === req.user.id){
        if(picList.length < 10){
        const {url} = req.body
        const newReviewImage = await ReviewImage.create({
            reviewId: Number(req.params.reviewId),
            url: url,
        })
        res.json({
            id: newReviewImage.id,
            url: newReviewImage.url})
    }else{
        res.status(400)
        res.json({message: "Maximum number of images for this resource was reached",
        statusCode: 400})
    }
}



})





module.exports = router;
