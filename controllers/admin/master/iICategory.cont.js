
const db = require('../../../models');
const IICategory = db.importantIssueCategory;

exports.addIICategory = async (req, res) => {
    console.log(req.body);
    try {
        var iICategoryCode;
        const iICategories = await IICategory.findAll();
        if (iICategories.length == 0) {
            iICategoryCode = "S100500";
        } else {
            var lastIICategory = iICategories[iICategories.length - 1];
            var lastDigits = lastIICategory.iICategoryCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            iICategoryCode = "S" + incrementedDigits;
        }
        await IICategory.create({
            iICategoryCode: iICategoryCode,
            iICategory: req.body.iICategory,
        }).then(data => {
            res.status(200).send(data);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Important Issue Category."
            });
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

exports.findAllIICategory = async (req, res) => {
    try {
        const iICategories = await IICategory.findAll();
        res.status(200).send(iICategories);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.deleteIIcategory = async (req, res) => {
    try {
        const id = req.params.id;
        const iICategories = await IICategory.findOne({ where: { id: id } });
        if (!iICategories) {
            return res.send(`Fail to delete: Id is not present`);
        }
        await iICategories.destroy();
        res.status(200).send(`Important Issue Category deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateIICategory = async (req, res) => {
    try {
        const id = req.params.id;
        const iICategories = await IICategory.findOne({ where: { id: id } });
        if (!iICategories) {
            return res.send(`Fail to update: Id is not present`);
        }
        var iICategoryCode;
        const updateIICategories = await IICategory.findAll();
        if (updateIICategories.length == 0) {
            iICategoryCode = "S100500";
        } else {
            var lastIICategory = updateIICategories[updateIICategories.length - 1];
            var lastDigits = lastIICategory.iICategoryCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            iICategoryCode = "S" + incrementedDigits;
        }
        await iICategories.update({
            iICategoryCode: iICategoryCode,
            iICategory: req.body.iICategory,
        });
        res.status(200).send(`Important Issue Category updated with ID: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};