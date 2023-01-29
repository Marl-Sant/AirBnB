const express = require('express');
const { SpotImage } = require('../../db/models');
const sequelize = require("sequelize")
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")
const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next)=> {
    const toBeDeleted = await SpotImage.findByPk(req.params.imageId)
    if(!toBeDeleted){
        res.status(404)
        res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
          })
    }
    
})

module.exports = router;
