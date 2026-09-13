// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const morgan = require("morgan")
const methodOverride = require("method-override")

// importing the mongoose models
const User = require('./models/User')
const Listing = require('./models/Listing')
const Review = require('./models/Review')
const Category = require('./models/Category')

// importing routes
const listingRoutes = require('./routers/listings.routes')
const categoryRoutes = require('./routers/category.routes')




// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal
app.use('/listings', listingRoutes)
app.use('/categories', categoryRoutes)

async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


conntectToDB()

async function createObjectToTest() {
    const newUser = await User.create({
        userName: 'Ahmed',
        password: "123456"
    })

    const newListing = await Listing.create({
        streetAddress: '1888',
        city: 'zayed town',
        price: 154000,
        size: 200,
        owner: newUser._id
    })
}

// createObjectToTest()


async function testRelationships() {
    const foundListing = await Listing.find().populate('owner category')
    // console.log(foundListing);
    console.log(foundListing.map(l => ({ id: l._id, category: l.category })));
}

testRelationships()



// Routes go here






app.listen(3000,()=>{
    console.log("Listening on port " + 3000)
}) // Listen on port 3000


