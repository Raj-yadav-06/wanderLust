const Joi = require('joi');
const review = require('./models/review');


const listingSchema = Joi.object({
    newListing : Joi.object({
        title : Joi.string().required(),
    description : Joi.string().required(),
    image : Joi.string().allow('', null),

    price : Joi.number().required().min(0),
    location : Joi.string().required(),
    country :  Joi.string().required(),
    category : Joi.array().required().min(1).max(3),
    }).required(),
    


})

const reviewSchema = Joi.object({
    review : Joi.object({
                rating : Joi.number().required().min(1).max(5),

        comment  : Joi.string().required(),
    }).required()
})


module.exports = {
  listingSchema,
  reviewSchema
};
