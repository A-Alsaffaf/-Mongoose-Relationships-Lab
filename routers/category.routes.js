const router = require('express').Router()
const Category = require('../models/Category')

router.get('/new', (req,res) => {
    res.render('categories/create-category.ejs')
})

router.get('/', async (req,res) => {
    const allCategories = await Category.find()
    res.render('categories/all-categories.ejs', {
        categories: allCategories
    })
})

router.post('/', async (req,res) => {
    
    console.log('create category request: ');
    
    console.log(req.body);
    try {
        const createdCategory = await Category.create({
        categoryName: req.body.categoryName
    })
    }

    catch(error) {
        console.log(error);
        
    }

    res.redirect('/categories')
})

module.exports = router