
const db = require('../../../models');
const Teacher = db.teacher;
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../configs/auth.config');
const fileHelper = require('../../../util/delete.file')

//register a teacher
exports.registerTeacher = async (req, res) => {
    console.log(req.file)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, contactNumber, confirmPassword, subject, role } = req.body;
        const isTeacher = await Teacher.findOne({ where: { email: email } });
        if (isTeacher) {
            return res.status(400).send('Sorry! This email id exists.');
        }

        if (confirmPassword != password) {
            return res.status(400).send('Sorry! Confirm Password should be match.');
        }

        const salt = await bcrypt.genSalt(10);
        const bcPassword = await bcrypt.hash(password, salt);

        const teachers = await Teacher.create({
            image: req.file.filename,
            name: name,
            email: email,
            password: bcPassword,
            contactNumber: contactNumber,
            subject: subject,
            role: role
        });

        const data = {
            id: teachers.id
        }
        const authToken = jwt.sign(data, secret);
        res.status(201).json({
            id: teachers.id,
            name: teachers.name,
            email: teachers.email,
            authToken: authToken
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//Login a teacher
exports.loginTeacher = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const isTeachers = await Teacher.findOne({ where: { email: email } });
        if (!isTeachers) {
            return res.status(400).send('Sorry! try to login with currect credentials.');
        }

        const compairPassword = await bcrypt.compare(password, isTeachers.password);
        if (!compairPassword) {
            return res.status(400).send('Sorry! try to login with currect credentials.');
        }

        const data = {
            id: isTeachers.id
        }
        const authToken = jwt.sign(data, secret);
        res.status(201).json({
            id: isTeachers.id,
            name: isTeachers.name,
            email: email,
            authToken: authToken
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//send teacher data by taken
exports.getTeacher = async (req, res) => {
    try {
        const teacherId = req.userId;
        const teachers = await Teacher.findOne({ where: { id: teacherId }, attributes: { exclude: ['password'] } });
        res.status(200).send(teachers);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//send all teacher data 
exports.getAllTeacher = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).send(teachers);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//update teacher data by token
exports.updateTeacher = async (req, res) => {
    try {
        let imagePath;
        let bcPassword;
        const teacherId = req.userId;
        const { name, password, contactNumber, previousPassword, subject, role } = req.body;
        const isTeacher = await Teacher.findOne({ where: { id: teacherId } });
        if (!isTeacher) {
            return res.status(400).send('Sorry! Teacher is not present.');
        }
        if (previousPassword) {
            const compairPassword = await bcrypt.compare(previousPassword, isTeacher.password);
            if (!compairPassword) {
                return res.status(400).send('Sorry! Enter a currect previous password.');
            }
            const salt = await bcrypt.genSalt(10);
            bcPassword = await bcrypt.hash(password, salt);
        }
        if (req.file) {
            fileHelper.deleteFile(isTeacher.image);
            imagePath = req.file.filename;
        }

        const teachers = await isTeacher.update({
            image: imagePath,
            name: name,
            password: bcPassword,
            contactNumber: contactNumber,
            subject: subject,
            role: role
        });
        res.status(201).json({
            id: teachers.id,
            name: teachers.name,
            email: teachers.email
        });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

