//import controller from review and products

const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController')

//router
const router = require('express').Router()


//use routes
router.post('/addProduct', productController.addProduct)

router.get('/allProduct', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)



//id
router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateOneProduct)

router.delete('/:id', productController.deleteOneProduct)



// review url and controller

router.get('/productsReview', productController.getProductReviews)

router.post('/addReview', reviewController.addReview)
router.get('/allReview', reviewController.getAllReviews)
module.exports = router;