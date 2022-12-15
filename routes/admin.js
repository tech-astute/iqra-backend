module.exports = (app) => {
    const level = require('../controllers/admin/master/level.cont');
    const medium = require('../controllers/admin/master/medium.cont');
    const subject = require('../controllers/admin/master/subject.cont');
    const category = require('../controllers/admin/master/category.cont');
    const course = require('../controllers/admin/course.cont');
    const question = require('../controllers/admin/question.cont');
    const article = require('../controllers/admin/article.cont');
    const editorial = require('../controllers/admin/editorial.cont');
    const banner = require('../controllers/admin/banner.cont');
    //middleware
    const uploadImage = require('../middleware/upload.image');

    const router = require('express').Router();

    router.post("/add-levels", level.addLevel);
    router.get("/levels", level.findAllLevel);
    router.delete("/delete-levels/:id", level.deleteLevel);
    router.put("/update-levels/:id", level.updateLevel);

    router.post("/add-mediums", medium.addMedium);
    router.get("/mediums", medium.findAllMedium);
    router.delete("/delete-mediums/:id", medium.deleteMedium);
    router.put("/update-mediums/:id", medium.updateMedium);

    router.post("/add-subjects", subject.addSubject);
    router.get("/subjects", subject.findAllSubject);
    router.delete("/delete-subjects/:id", subject.deleteSubject);
    router.put("/update-subjects/:id", subject.updateSubject);

    router.post("/add-courses", course.addCourse);
    router.get("/courses", course.getAllCourse);
    router.delete("/delete-courses/:id", course.deleteCourse);
    router.put("/update-courses/:id", course.updateCourse);

    //<input type="file" name="categoryimage"/>
    router.post("/add-categorys", uploadImage.single("categoryimage"), category.addCategory);
    router.get("/categorys", category.getAllCategory);
    router.delete("/delete-categorys/:id", category.deleteCategory);
    router.put("/update-categorys/:id", uploadImage.single("categoryimage"), category.updateCategory);

    //<input type="file" name="questiontag"/>
    router.post("/add-questions", uploadImage.single("questiontag"), question.addQuestion);
    router.get("/questions", question.getAllQuestion);

    router.post("/add-articles", article.addArticle);
    router.get("/articles", article.getAllArticle);

    router.post("/add-editorials", editorial.addEditorial);
    router.get("/editorials", editorial.getAllEditorial);

    router.post("/add-banners", uploadImage.single("bannerimage"), banner.addBanner);
    router.get("/banners", banner.getAllBanner);
    router.delete("/delete-banners/:id", banner.deleteBanner);
    router.put("/update-banners/:id", uploadImage.single("bannerimage"), banner.updateBanner);

    app.use("/api/master", router);

};