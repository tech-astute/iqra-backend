
const db = require('../../../models');
const Subject = db.subject;

exports.addSubject = async (req, res) => {
    try {
        var subjectCode;
        const subjects = await Subject.findAll();
        if (subjects.length == 0) {
            subjectCode = "S100500";
        } else {
            var lastSubject = subjects[subjects.length - 1];
            var lastDigits = lastSubject.subjectCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            subjectCode = "S" + incrementedDigits;
        }
        await Subject.create({
            subjectCode: subjectCode,
            subject: req.body.subject
        }).then(data => {
            res.status(200).send(data);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Subject."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllSubject = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.status(200).send(subjects);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteSubject = async (req, res) => {
    try {
        const id = req.params.id;
        const subjects = await Subject.findOne({ where: { id: id } });
        if (!subjects) {
            //console.log(`Id is not present`);
            return res.send(`Fail to delete: Id is not present`);
        }
        await subjects.destroy();
        res.status(200).send(`Subject deleted with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateSubject = async (req, res) => {
    try {
        const id = req.params.id;
        const subjects = await Subject.findOne({ where: { id: id } });
        if (!subjects) {
            //console.log(`Id is not present`);
            return res.send(`Fail to update: Id is not present`);
        }
        var subjectCode;
        const updateCode = await Subject.findAll();
        if (updateCode.length == 0) {
            subjectCode = "S100500";
        } else {
            var lastLevel = updateCode[updateCode.length - 1];
            var lastDigits = lastLevel.levelCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            subjectCode = "S" + incrementedDigits;
        }
        await subjects.update({
            subjectCode: subjectCode,
            subject: req.body.subject
        });
        res.status(200).send(`Subject updated with ID: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};