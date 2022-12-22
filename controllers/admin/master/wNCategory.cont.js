
const db = require('../../../models');
const WNCategory = db.weeklyNewsCategory;

exports.addWNCategory = async (req, res) => {
    try {
        var wNCategoryCode;
        const wNCategories = await WNCategory.findAll();
        if (wNCategories.length == 0) {
            wNCategoryCode = "S100500";
        } else {
            var lastWNCategory = wNCategories[wNCategories.length - 1];
            var lastDigits = lastWNCategory.wNCategoryCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            wNCategoryCode = "S" + incrementedDigits;
        }
        await WNCategory.create({
            wNCategoryCode: wNCategoryCode,
            wNCategory: req.body.wNCategory,
        }).then(data => {
            res.status(200).send(data);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Weekly News Category."
            });
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

exports.findAllWNCategory = async (req, res) => {
    try {
        const wNCategories = await WNCategory.findAll();
        res.status(200).send(wNCategories);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.deleteWNcategory = async (req, res) => {
    try {
        const id = req.params.id;
        const wNCategories = await WNCategory.findOne({ where: { id: id } });
        if (!wNCategories) {
            return res.send(`Fail to delete: Id is not present`);
        }
        await wNCategories.destroy();
        res.status(200).send(`Weekly News Category deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateWNCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const wNCategories = await WNCategory.findOne({ where: { id: id } });
        if (!wNCategories) {
            return res.send(`Fail to update: Id is not present`);
        }
        var wNCategoryCode;
        const updateWNCategories = await WNCategory.findAll();
        if (updateWNCategories.length == 0) {
            wNCategoryCode = "S100500";
        } else {
            var lastWNCategory = updateWNCategories[updateWNCategories.length - 1];
            var lastDigits = lastWNCategory.wNCategoryCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            wNCategoryCode = "S" + incrementedDigits;
        }
        await wNCategories.update({
            wNCategoryCode: wNCategoryCode,
            wNCategory: req.body.wNCategory,
        });
        res.status(200).send(`Weekly Issue Category updated with ID: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};