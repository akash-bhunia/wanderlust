const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


//all data we need
const listingSchema = new Schema({
title:{
    type:String,
    require:true,
},
description: String,

image:{
    url: String,
    filename:String,
} ,
price:Number,
location: String,
country: String,
reviews:[
    {
        type: Schema.Types.ObjectId,
        ref: "Review",
    }
],
owner:{
    type:Schema.Types.ObjectId,
    ref: "User",
},
});

//DELETE MIDDLEWARE FOR REVIEWS
listingSchema.post("findOneAndDelete", async(listing) =>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}})
    }
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports=Listing;