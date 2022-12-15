
const db = require('../../../models');
const Level = db.level;

exports.addLevel = async (req, res) => {
    try {
        var levelCode;
        const levels = await Level.findAll();
        if (levels.length == 0) {
            levelCode = "S100500";
        } else {
            var lastLevel = levels[levels.length - 1];
            var lastDigits = lastLevel.levelCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            levelCode = "S" + incrementedDigits;
        }
        await Level.create({
            levelCode: levelCode,
            level: req.body.level,
        }).then(data => {
            res.status(200).send(data);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Level."
            });
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

exports.findAllLevel = async (req, res) => {
    try {
        const levels = await Level.findAll();
        res.status(200).send(levels);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

exports.deleteLevel = async (req, res) => {
    try {
        const id = req.params.id;
        const levels = await Level.findOne({ where: { id: id } });
        if (!levels) {
            //console.log(`Id is not present`);
            return res.send(`Fail to delete: Id is not present`);
        }
        await levels.destroy();
        res.status(200).send(`Level deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateLevel = async (req, res) => {
    try {
        const id = req.params.id;
        const levels = await Level.findOne({ where: { id: id } });
        if (!levels) {
            //console.log(`Id is not present`);
            return res.send(`Fail to update: Id is not present`);
        }
        var levelCode;
        const updateCode = await Level.findAll();
        if (updateCode.length == 0) {
            levelCode = "S100500";
        } else {
            var lastLevel = updateCode[updateCode.length - 1];
            var lastDigits = lastLevel.levelCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            levelCode = "S" + incrementedDigits;
        }
        await levels.update({
            levelCode: levelCode,
            level: req.body.level,
        });
        res.status(200).send(`Level updated with ID: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};