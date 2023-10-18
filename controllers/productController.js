const db = require('../models')

//create main model
const Product = db.products
const Review = db.reviews

//main work

//1.create product

const addProduct = async (req, res) => {

    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)

}

//2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}                                                     // check findone online to diffrenctiate with find bypk

// 3. get single product

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id } })
    if (!product) {
        res.status(404)
        throw new Error("no product at this moment")
    }
    res.status(200).send(product)

}


//4. update Product

const updateOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.update(req.body, { where: { id: id } })
    res.status(200).send(product)

}



// 5. delete product

const deleteOneProduct = async (req, res) => {

    let id = req.params.id
    await Product.destroy({ where: { id: id } })
    res.status(200).send("product deleted")

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products = await Product.findAll({ where: { published: true } })
    res.status(200).send(products)

}

//7. 
const getProductReviews = async (req, res) => {
    const data = await Product.findAll({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: 2 }
    })
}

// @lucasmancini6027
// 1 year ago
// Hello, 
// You just forget to add the line to add product_id to a review 
// line to put in the function addReview()
// product_id: req.body.product_id

module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateOneProduct,
    deleteOneProduct,
    getPublishedProduct,
    getProductReviews
}