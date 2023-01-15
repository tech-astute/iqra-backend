module.exports = (app) => {
    const level = require('../controllers/admin/master/level.cont');
    const medium = require('../controllers/admin/master/medium.cont');
    const subject = require('../controllers/admin/master/subject.cont');
    const language = require('../controllers/admin/master/language.cont');
    const category = require('../controllers/admin/master/category.cont');
    const iICategory = require('../controllers/admin/master/iICategory.cont');
    const wNCategory = require('../controllers/admin/master/wNCategory.cont');
    const course = require('../controllers/admin/course.cont');
    const question = require('../controllers/admin/question.cont');
    const article = require('../controllers/admin/article.cont');
    const editorial = require('../controllers/admin/editorial.cont');
    const banner = require('../controllers/admin/banner.cont');
    const admin = require('../controllers/admin/admin.cont');
    const testSeries = require('../controllers/admin/testSeries.cont');
    const addCourse = require('../controllers/admin/course/addcourse.cont');
    const liveclass = require('../controllers/admin/course/liveclasses.cont');
    const contents = require('../controllers/admin/course/uploadcontent.cont');
    //middleware
    const uploadImage = require('../middleware/upload.image');
    const uploadPDF = require('../middleware/upload.pdf');
    const authJwt = require('../middleware/verifyJwt');
    const verifySignUp = require('../middleware/auth.validation');
    const uploadFiles = require('../middleware/testSeriesNote');

    const router = require('express').Router();

    router.post("/signupAdmin", [verifySignUp.checkDuplicateEmail], admin.registerAdmin);
    router.post("/signinAdmin", admin.loginAdmin);
    router.post("/signoutAdmin", admin.logoutAdmin);
    router.get("/admin", [authJwt.verifyToken], admin.adminBoard);



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

    router.post("/add-iICategories", iICategory.addIICategory);
    router.get("/iICategories", iICategory.findAllIICategory);
    router.delete("/delete-iICategories/:id", iICategory.deleteIIcategory);
    router.put("/update-iICategories/:id", iICategory.updateIICategory);

    router.post("/add-wNCategories", wNCategory.addWNCategory);
    router.get("/wNCategories", wNCategory.findAllWNCategory);
    router.delete("/delete-wNCategories/:id", wNCategory.deleteWNcategory);
    router.put("/update-wNCategories/:id", wNCategory.updateWNCategory);

    router.post("/add-languages", language.addLanguage);
    router.get("/languages", language.findAllLanguage);

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
    router.delete("/delete-articles/:id", article.deleteArticle);
    router.put("/update-articles/:id", article.updateArticle);

    router.post("/add-editorials", editorial.addEditorial);
    router.get("/editorials", editorial.getAllEditorial);
    router.delete("/delete-editorials/:id", editorial.deleteEditorial);
    router.put("/update-editorials/:id", editorial.updateEditorial);

    router.post("/add-banners", uploadImage.single("bannerimage"), banner.addBanner);
    router.get("/banners", banner.getAllBanner);
    router.delete("/delete-banners/:id", banner.deleteBanner);
    router.put("/update-banners/:id", uploadImage.single("bannerimage"), banner.updateBanner);

    router.post("/add-addCourses", uploadImage.single("image"), addCourse.createAddCourse);
    router.get("/addCourses", addCourse.getAllAddCourse);
    router.delete("/delete-addCourses/:id", addCourse.deleteAddCourse);
    router.put("/update-addCourses/:id", uploadImage.single("image"), addCourse.updateAddCourse);

    router.post("/add-liveClasses", uploadImage.single("thumbnail"), liveclass.createLiveClass);
    router.get("/liveClasses", liveclass.getAllLiveClass);
    router.delete("/delete-liveClasses/:id", liveclass.deleteLiveClass);
    router.put("/update-liveClasses/:id", uploadImage.single("thumbnail"), liveclass.updateLiveClass);
    router.get("/liveClasses/:course", liveclass.getAllLiveClassByCourse);
    
    router.post("/add-contents", uploadPDF.single("notes"), contents.createContent);
    router.get("/contents", contents.getAllContent);
    router.delete("/delete-contents/:id", contents.deleteContent);
    router.put("/update-contents/:id", uploadPDF.single("notes"), contents.updateContent);
    router.get("/contents/:course", contents.getAllContentByCourse);

    router.post("/add-testSeries", uploadFiles.array("testSeriesNotes", 20), testSeries.addTestSeries);
    router.get("/testSeries", testSeries.getTestSeries);

    app.use("/api/master", router);
};