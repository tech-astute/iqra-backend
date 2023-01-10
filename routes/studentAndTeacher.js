module.exports = (app) => {
    const { body } = require('express-validator');
    const student = require('../controllers/admin/student/student.cont');
    const teacher = require('../controllers/admin/teacher/teacher.cont');

    //middleware
    const authJwt = require('../middleware/verifyJwt');
    const uploadImage = require('../middleware/upload.image');

    const router = require('express').Router();

    //student
    router.post("/register-students", [
        body('name', 'Name should have atleast three characters!').isLength({ min: 3 }),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Passward should have atleast six characters!').isLength({ min: 6 }),
    ], student.registerStudent);
    router.post("/login-students", [
        body('email', 'Enter a valid Email!').isEmail(),
        body('password', 'passward can not be null!').exists(),
    ], student.loginStudent);
    router.get("/students", authJwt.verifyToken, student.getStudent);
    router.get("/allStudents", student.getAllStudent);
    router.put("/update-students", authJwt.verifyToken, student.updateStudent);

    //teacher
    router.post("/register-teachers", [uploadImage.single("teacherImage"),
    body('name', 'Name should have atleast three characters!').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Passward should have atleast six characters!').isLength({ min: 6 }),
    ], teacher.registerTeacher);
    router.post("/login-teachers", [
        body('email', 'Enter a valid Email!').isEmail(),
        body('password', 'passward can not be null!').exists(),
    ], teacher.loginTeacher);
    router.get("/teachers", authJwt.verifyToken, teacher.getTeacher);
    router.get("/allTeachers", teacher.getAllTeacher);
    router.put("/update-teachers", authJwt.verifyToken, [ 
        uploadImage.single("teacherImage")
    ], teacher.updateTeacher);

    app.use("/api/student", router);

};