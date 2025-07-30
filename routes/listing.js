const express = require("express");
const app = express();
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin, isOwner , validateListing , validateObjectId} = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer  = require('multer');
const{storage} = require("../cloudConfig.js");
const upload = multer({storage});
const ExpressError = require("../utils/expressError.js");



const router = express.Router();


router.get("/new" , isLoggedin ,wrapAsync(listingControllers.newListingForm));

router.get("/filter/:filter" , wrapAsync(listingControllers.filterListing));

// In your routes file
router.get('/admin/update-geometry', isLoggedin, wrapAsync(listingControllers.addGeometryToExistingListings));

// first page styling (all listings shows here)
router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedin , validateListing ,upload.single("newListing[image]"),wrapAsync(listingControllers.newListing));


router.get("/:id/edit" ,validateObjectId, isLoggedin , isOwner ,wrapAsync(listingControllers.editForm))


router.route("/:id")
.get(validateObjectId, wrapAsync(listingControllers.showListing))
.put(validateObjectId , isLoggedin, isOwner,upload.single("newListing[image]")  ,validateListing ,wrapAsync(listingControllers.updatedListing))
.delete(validateObjectId,isLoggedin , isOwner ,wrapAsync(listingControllers.destroyListing));









module.exports = router;