const db = require('../../../models');
const Student = db.student;
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, api_key } = require('../../../configs/auth.config');
const nodeMailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodeMailer.createTransport(sendGridTransport({
    auth:{
        api_key: api_key
    }
}));

//register a student
exports.registerStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, contactNumber, optSubject, medium, totalAttempt, confirmPassword } = req.body;
        const isStudent = await Student.findOne({ where: { email: email } });
        if (isStudent) {
            return res.status(400).send('Sorry! This email id exists.');
        }
        if (confirmPassword != password) {
            return res.status(400).send('Sorry! Confirm Password should be match.');
        }
        const salt = await bcrypt.genSalt(10);
        const bcPassword = await bcrypt.hash(password, salt);

        const students = await Student.create({
            name: name,
            email: email,
            password: bcPassword,
            optSubject: optSubject,
            totalAttempt: totalAttempt,
            medium: medium,
            contactNumber: contactNumber
        });

        const data = {
            id: students.id
        }
        const authToken = jwt.sign(data, secret);
        res.status(201).json({
            id: students.id,
            name: name,
            email: email,
            authToken: authToken
        });
        return transporter.sendMail({
            to: email,
            from: 'ankushgupta9675@gmail.com',
            subject: 'registration successfully',
            html: "<h1> Thank you to join Iqra! </h1>"
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//Login a student
exports.loginStudent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const isStudent = await Student.findOne({ where: { email: email } });
        if (!isStudent) {
            return res.status(400).send('Sorry! try to login with currect credentials.');
        }

        const compairPassword = await bcrypt.compare(password, isStudent.password);
        if (!compairPassword) {
            return res.status(400).send('Sorry! try to login with currect credentials.');
        }

        const data = {
            id: isStudent.id
        }
        const authToken = jwt.sign(data, secret);
        res.status(201).json({
            id: isStudent.id,
            name: isStudent.name,
            email: isStudent.email,
            authToken: authToken
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//send student data by token
exports.getStudent = async (req, res) => {
    try {
        const studentId = req.userId;
        const students = await Student.findOne({ where: { id: studentId }, attributes: { exclude: ['password'] } });
        res.status(200).send(students);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//send all student data 
exports.getAllStudent = async (req, res) => {
    try {
        const students = await Student.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).send(students);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//update student data by token
exports.updateStudent = async (req, res) => {
    try {
        let bcPassword;
        const studentId = req.userId;
        const { name, password, contactNumber, optSubject, totalAttempt, medium, previousPassword } = req.body;
        const isStudent = await Student.findOne({ where: { id: studentId } });
        if (!isStudent) {
            return res.status(400).send('Sorry! Student is not present.');
        }
        if (previousPassword) {
            const compairPassword = await bcrypt.compare(previousPassword, isTeacher.password);
            if (!compairPassword) {
                return res.status(400).send('Sorry! Enter a currect previous password.');
            }
            const salt = await bcrypt.genSalt(10);
            bcPassword = await bcrypt.hash(password, salt);
        }

        const students = await isStudent.update({
            name: name,
            password: bcPassword,
            optSubject: optSubject,
            totalAttempt: totalAttempt,
            medium: medium,
            contactNumber: contactNumber
        });
        res.status(201).json(students);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}