const router = require('express').Router()
const Listing = require('../models/Listing')
const methodOverride = require("method-override")

//middleware
router.use(methodOverride('_method'))

router.get('/new', (req,res) => {
    res.render('listings/create-listing.ejs')
})

router.get('/', async (req,res) => {
    const allListings = await Listing.find().populate('owner category')
    res.render('listings/all-listings.ejs', {
        listings: allListings
    })
})

router.get('/:listingId/edit', async (req,res) => {
    const foundListing = await Listing.findById(req.params.listingId)
    console.log(foundListing);
    
    res.render('listings/edit-listing.ejs', {
        listing: foundListing,
    })
})

router.put('/:listingId', async (req,res) => {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.listingId, req.body)
    res.redirect('/listings')
})


router.post('/', async (req,res) => {
    const createdListing = await Listing.create({
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        price: req.body.price,
        size: req.body.size,
        owner: req.body.owner,
        category: req.body.category
    })
    // console.log(createdListing.populate('owner'));
    res.redirect('/listings')
})

router.delete('/:listingId', async (req,res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.listingId)
    res.redirect('/listings')
})

module.exports = router