const listing = require("../models/listing.js");
const { getCoordinates } = require("./geoCoding.js");
const axios = require('axios');

module.exports.index = async (req, res, next) => {

    let listings = await listing.find({});
      const query = req.query.query;
    
    if (query) {
        const searchTerm = query.toLowerCase();
        listings = listings.filter(listing => 
            listing.title.toLowerCase().includes(searchTerm) ||
            listing.description.toLowerCase().includes(searchTerm) ||
            listing.location.toLowerCase().includes(searchTerm) ||
            listing.country.toLowerCase().includes(searchTerm)
        );
    }
    res.render("listings/index.ejs", { listings });
}

module.exports.filterListing = async(req,res,next) => {
    let {filter} = req.params;
   if(filter == "all"){
    return res.redirect("/listings");
   }
    let listings = await listing.find({});
    listings = listings.filter( listing => listing.category.includes(filter));
       res.render("listings/index.ejs", { listings });

    

}
module.exports.newListingForm = async (req, res) => {
    res.render("listings/create.ejs");
}

module.exports.newListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let { newListing } = req.body;

     if(!newListing.category){
        req.flash("error" , "atleast 1 category must be selected");
        res.redirect("/listings/new");
        return;
    }else if(newListing.category.length > 3){
        req.flash("error" , "Maximum 3 categories can be selected");
        res.redirect("/listings/new");
        return;
    }
    // Get coordinates for the location
    const geometry = await getCoordinates(newListing.location, newListing.country);
    
    let newPost = new listing(newListing); 
    newPost.owner = req.user._id;
    newPost.image = { url, filename };
    newPost.geometry = geometry; // Add coordinates to the listing
    
    await newPost.save();
    req.flash("success", "New listing successfully created!");
    res.redirect("/listings");
}

module.exports.editForm = async (req, res, next) => {
    let { id } = req.params;
    let list = await listing.findById(id);
    if (!list) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    
    res.render("listings/edit.ejs", { list });
}

module.exports.updatedListing = async (req, res, next) => {
    let { id } = req.params;
    console.log(req.body);
    let { newListing } = req.body;
    
    // Get the current listing to compare location changes
    let currentListing = await listing.findById(id);
    
    if (!currentListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    
    // Check if location or country has changed
    const locationChanged = currentListing.location !== newListing.location || 
                           currentListing.country !== newListing.country;
    
    // Get new coordinates if location changed
    if (locationChanged && newListing.location && newListing.country) {
        const geometry = await getCoordinates(newListing.location, newListing.country);
        newListing.geometry = geometry;
        console.log('Location changed, updated coordinates:', geometry);
    } else if (!currentListing.geometry && newListing.location && newListing.country) {
        // If listing doesn't have geometry but has location data, add it
        const geometry = await getCoordinates(newListing.location, newListing.country);
        newListing.geometry = geometry;
        console.log('Added missing geometry:', geometry);
    }

    let updatedListing = await listing.findByIdAndUpdate(id, newListing, { 
        new: true,
        runValidators: true 
    });

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }
    
    req.flash("success", `Listing is successfully updated`);
    res.redirect(`/listings/${id}`);
}

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    let list = await listing.findById(id).populate({path: "reviews",populate: {path: "author"},}).populate("owner");
        // console.log(list);
    if (!list) {
        req.flash("error", `Listing does not exist`);
        return res.redirect("/listings");
    }
    
    res.render("listings/show.ejs", { list });
};

module.exports.destroyListing = async (req, res, next) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id); 
    req.flash("success", `Listing is successfully deleted`);
    res.redirect("/listings"); 
}

// // Function to add geometry to existing listings that don't have it
module.exports.addGeometryToExistingListings = async (req, res) => {
    const listings = await listing.find({ 
        $or: [
            { geometry: { $exists: false } },
            { geometry: null }
        ]
    });
    
    console.log(`Found ${listings.length} listings without geometry`);
    
    let updatedCount = 0;
    
    for (let listingDoc of listings) {
        if (listingDoc.location && listingDoc.country) {
            const geometry = await getCoordinates(listingDoc.location, listingDoc.country);
            
            await listing.findByIdAndUpdate(listingDoc._id, { 
                geometry 
            }, {
                runValidators: true
            });
            
            console.log(`Updated ${listingDoc.title || listingDoc._id} with coordinates`);
            updatedCount++;
            
            // Add delay to be respectful to the geocoding service
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    res.json({ 
        message: `Updated ${updatedCount} out of ${listings.length} listings with geometry`,
        total: listings.length,
        updated: updatedCount
    });
};
