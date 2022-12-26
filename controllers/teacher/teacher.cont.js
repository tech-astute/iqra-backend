const jWToken = require('../../configs/auth.config');
const db = require('../../models');
const Teacher = db.teacher;
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { studentSecret } = require('../../configs/auth.config');

//register a teacher
exports.registerTeacher = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({errors: errors.array() });
    }
    try{
        console.log(req.body)
        const { name, email, password, contactNumber, cunfirmPassword, subject, role} = req.body;
        const isTeacher = await Teacher.findOne({where: {email: email}});
        if (isTeacher) {
            return res.status(400).send('Sorry! This email id exists.');
        }

        if(cunfirmPassword != password) {
            return res.status(400).send('Sorry! Password should be match.');
        }

        const salt = await bcrypt.genSalt(10);
        const bcPassword = await bcrypt.hash(password, salt);

        const teachers = await Teacher.create({
            name: name,
            email: email,
            password: bcPassword,
            contactNumber: contactNumber,
            subject: subject,
            role: role
        });

        const data = {
            teacherId:{
                id: teachers.id
            }
        }
        //console.log(data);
        const authToken = jwt.sign(data, studentSecret);
        res.status(201).json({authToken});
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};

//Login a teacher
exports.loginteacher = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({errors: errors.array() });
    }
    try{
        const { email, password} = req.body;
        const isTeachers = await Teacher.findOne({where: {email: email}});
        if (!isTeachers) {
            return res.status(400).send('Sorry! try to login with currect credentials.');
        }

        const compairPassword = await bcrypt.compare(password, isTeachers.password);
        if (!compairPassword) {
            return res.status(400).send('Sorry! try to login with currect credentials.');
        }

        const data = {
            teacherId:{
                id: isTeachers.id
            }
        }
        //console.log(data);
        const authToken = jwt.sign(data, studentSecret);
        res.status(201).json({authToken});
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};