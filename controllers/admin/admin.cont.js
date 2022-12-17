const db = require("../../models");
const Admin = db.admin;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registerAdmin = async (req, res) => {
    try{
        const admin = await Admin.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        const token = jwt.sign({id: admin.id}, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            id: admin.id,
            email: admin.email,
            accessToken: token
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

exports.loginAdmin = async (req, res) => {
    try{
        console.log("hello");
        const admin = await Admin.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!admin){
            return res.status(404).send({message: "Admin not found."});
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        const token = jwt.sign({id: admin.id}, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            id: admin.id,
            email: admin.email,
            accessToken: token
        });
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

exports.logoutAdmin = async (req, res) => {
    try{
        req.session.destroy();
        res.status(200).send({message: "Logout successful!"});
    }catch(err){
        res.status(500).send({message: err.message});
    }
}

exports.adminBoard = async (req, res) => {
    try{
        res.status(200).send({message: "Admin Board."});
    }catch(err){
        res.status(500).send({message: err.message});
    }
}