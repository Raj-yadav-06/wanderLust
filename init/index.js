const mongoose = require("mongoose");
const initData = require("./init.js");

// connecting to db
main().then( () => {
    console.log("database connection succesfull");
}).catch((err) => {
console.log("failed to connect " + err);
})



async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust');
}
const listing = require("../models/listing.js");


async function insertingData(){
    await listing.deleteMany({});
    initData.data = initData.data.map( (obj) => ({...obj , owner: "6881c59a04eb8be104b69e3a" }));
    await listing.insertMany(initData.data);
    console.log("done");
}
insertingData();