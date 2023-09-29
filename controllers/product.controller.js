const Product = require('../models/product.model');

exports.findAll = async(req, res) => {

    console.log("Find all products");
    try {

        const result = await Product.find();
        res.status(200).json({status: true, data: result});
        console.log("SUCCESS READ");
        
    } catch (err) {
        
        res.status(400).json({status: false, data: result});
        console.log("ERROR");
    }
};

exports.findOne = async(req, res) => {

    const id = req.params.id;
    console.log("Find product with products's name: " + id);

    try {

        const result = await Product.findOne({id: id});
        res.status(200).json({status: true, data: result});
        
    } catch (err) {
        res.status(400).json({status: false, data: result});
        console.log("ERROR");
    }
};

exports.create = async(req, res) => {

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    try {

        const result = await newProduct.save();
        console.log("Insert Product with id: ", req,body.id);
        res.status(200).json({status: true, data: result});
        console.log("Success Inserting Product with id: ", req,body.id);
        
    } catch (err) {
        res.status(400).json({status: false, data: result});
        console.log("Problem in Inserting Product with id: ", req.body.id);
    }
};

exports.update = async(req, res) => {

    const id = req.params.id;
    console.log("Update Product with id: ", id);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {

        const result = await Product.findOneAndUpdate({Id: id}, updateProduct, {new: true});
        res.status(200).json({status: true, data: result});
        console.log("Success Updating with id ", id);   

    } catch (err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in Updating Product with id: " , id);
    }
};

exports.delete = async(req, res) => {
    const id = req.params.Id;
    console.log("Delete Product with id " , id);

    try {

        const result = await Product.findOneAndRemove({id: id});
        res.status(200).json({status: true, data: result});
        console.log("Success Deleting with id ", id);
        
    } catch (err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in Deleting Product with id: " , id);
    }
}