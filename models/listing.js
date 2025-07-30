const mongoose = require("mongoose");
const review = require("./review");
const { ref } = require("joi");
const {Schema} = mongoose;
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        url : String,
        filename : String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,

    },
    country: {
        type: String,
    },
     geometry: {
        type: {
            type: String,
            enum: ['Point'], // Only allow Point type
            required: true
        },
        coordinates: {
            type: [Number], // Array of numbers [longitude, latitude]
            required: true
        }},
    reviews : [{
       type  : Schema.Types.ObjectId,
ref : "review",
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
 category : {
    type : [String],
    enum : ["rooms" , "pools" , "mountains" , "beach" ,"cabins" , "country side" ,"farms","amazing views"],
 }
})

listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing){
    await review.deleteMany({_id : {$in : listing.reviews}});
    }

});








listingSchema.index({ geometry: '2dsphere' });



const listing = mongoose.model("listing", listingSchema);
module.exports = listing;


