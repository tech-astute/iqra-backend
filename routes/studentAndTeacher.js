module.exports = (app) => {
    const { body } = require('express-validator');
    const student = require('../controllers/student/student.cont');
    const teacher = require('../controllers/teacher/teacher.cont');

    //middleware
    const authJwt = require('../middleware/verifyJwt');

    const router = require('express').Router();

    //student
    router.post("/register-students",[
        body('name', 'Name should have atleast three characters!').isLength({ min: 3}),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Passward should have atleast six characters!').isLength({ min:6 }),
    ], student.registerStudent);
    router.post("/login-students",[
        body('email', 'Enter a valid Email!').isEmail(),
        body('password', 'passward can not be null!').exists(),
    ], student.loginStudent);
    router.get("/students", authJwt.verifyToken, student.getStudent);
    router.get("/allStudents", student.getAllStudent);
    router.put("/update-students", authJwt.verifyToken, [
        body('password', 'Passward should have atleast six characters!').exists(),
    ], student.updateStudent);

    //teacher
    router.post("/register-teachers",[
        body('name', 'Name should have atleast three characters!').isLength({ min: 3}),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Passward should have atleast six characters!').isLength({ min:6 }),
    ], teacher.registerTeacher);
    router.post("/login-teachers",[
        body('email', 'Enter a valid Email!').isEmail(),
        body('password', 'passward can not be null!').exists(),
    ], teacher.loginTeacher);
    router.get("/teachers", authJwt.verifyToken, teacher.getTeacher);
    router.get("/allTeachers", teacher.getAllTeacher);
    
    app.use("/api/student", router);

};