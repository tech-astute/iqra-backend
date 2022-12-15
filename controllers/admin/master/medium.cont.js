const db = require('../../../models');
const Medium = db.medium;

exports.addMedium = async (req, res) => {
    try {
        var mediumCode;
        const mediums = await Medium.findAll();
        if (mediums.length == 0) {
            mediumCode = "S100500";
        } else {
            var lastMedium = mediums[mediums.length - 1];
            var lastDigits = lastMedium.mediumCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            mediumCode = "S" + incrementedDigits;
        }
        await Medium.create({
            mediumCode: mediumCode,
            medium: req.body.medium
        }).then(data => {
            res.status(200).send(data);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Medium."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllMedium = async (req, res) => {
    try {
        const mediums = await Medium.findAll();
        res.status(200).send(mediums);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteMedium = async (req, res) => {
    try {
        const id = req.params.id;
        const mediums = await Medium.findOne({ where: { id: id } });
        if (!mediums) {
            //console.log(`Id is not present`);
            return res.send(`Fail to delete: Id is not present`);
        }
        await mediums.destroy();
        res.status(200).send(`Medium deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateMedium = async (req, res) => {
    try {
        const id = req.params.id;
        const mediums = await Medium.findOne({ where: { id: id } });
        if (!mediums) {
            //console.log(`Id is not present`);
            return res.send(`Fail to update: Id is not present`);
        }
        var mediumCode;
        const updateCode = await Medium.findAll();
        if (updateCode.length == 0) {
            mediumCode = "S100500";
        } else {
            var lastLevel = updateCode[updateCode.length - 1];
            var lastDigits = lastLevel.levelCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            mediumCode = "S" + incrementedDigits;
        }
        await mediums.update({
            mediumCode: mediumCode,
            medium: req.body.medium
        });
        res.status(200).send(`Medium updated with ID: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
