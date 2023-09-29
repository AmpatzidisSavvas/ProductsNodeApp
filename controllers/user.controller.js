
const User = require('../models/user.model');
const logger = require('../logger/logger');


exports.findAll = async(req, res) => {

    console.log("Find all users");
    try {

        const result = await User.find();
        res.status(200).json({status: true, data: result});
        console.log("SUCCESS READ");
        logger.info("Log info success in reading all users");
        
        // logger.log("Logger Success in reading all users");

    } catch(err) {

        res.status(400).json({status: false, data: err});
        console.log("ERROR");
        logger.error("Problem in reading all users")
    }
    
};

exports.findOne = async(req, res) => {
    
    const username = req.params.username;
    console.log("Find user with username ", username );

    try {

        const result = await User.findOne({username: username})
        res.status(200).json({status: true, data: result});
    } catch (err) {

        res.status(400).json({status: false, data: err});
        console.log("ERROR");
    }
    
};

exports.create = async(req, res) => {

    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    });

    try {

        const result = await newUser.save();
        console.log("Insert User with username: ", req.body.username);
        res.status(200).json({status: true, data: result});
        console.log("Success Inserting with username ", req.body.username);

    } catch (err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in Inserting User with username: " , req.body.username);
    }
};

exports.update = async(req,res) => {

    const username = req.body.username;
    console.log("Update User with username ", username);

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }
    try {

        const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true});
        res.status(200).json({status: true, data: result});
        console.log("Success Updating with username ", username);
            
    } catch (err) {

         res.status(400).json({status: false, data: err});
        console.log("Problem in Updating User with username: " , username);
    }
    
};

exports.delete = async(req, res) => {

    const username = req.params.username;
    console.log("Delete User with username " , username);


    try {

        const result = await User.findOneAndRemove({username: username});
        res.status(200).json({status: true, data: result});
        console.log("Success Deleting with username ", username);
        
    } catch (err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in Deleting User with username: " , username);
    }
};