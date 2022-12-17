const db = require("../models");
const Admin = db.admin;

checkDuplicateEmail = (req, res, next) => {
    // Email
    Admin.findOne({
        where: {
            email: req.body.email
        }
    }).then(admin => {
        if (admin) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;
