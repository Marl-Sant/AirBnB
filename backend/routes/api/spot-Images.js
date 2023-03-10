const express = require('express');
const { SpotImage, Spot } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")
const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next)=> {
    const toBeDeleted = await SpotImage.findOne({
        where:{id: req.params.imageId},
        include: {model: Spot}
    })

    if(!toBeDeleted){
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
          })
    }
    
    if(toBeDeleted.Spot.dataValues.ownerId !== req.user.id){
        res.status(401)
        return res.json(
            {message: "Operation failed. You must be the owner of this image to delete it", statusCode:401}
        )
    }

    await toBeDeleted.destroy()
    res.json(
        {
            message: "Successfully deleted",
            statusCode: 200
          }
    )
})

module.exports = router;
