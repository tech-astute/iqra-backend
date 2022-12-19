const db = require('../../../models');
const Language = db.language;

exports.addLanguage = async (req, res) => {
    try {
        var languageCode;
        const languages = await Language.findAll();
        if (languages.length == 0) {
            languageCode = "S100500";
        } else {
            var lastLanguage = languages[languages.length - 1];
            var lastDigits = lastLanguage.languageCode.substring(1, 7);
            var incrementedDigits = parseInt(lastDigits, 10) + 1;
            languageCode = "S" + incrementedDigits;
        }
        await Language.create({
            languageCode: languageCode,
            language: req.body.language
        }).then(data => {
            res.status(200).send(data);
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Language."
            });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllLanguage = async (req, res) => {
    try {
        const languages = await Language.findAll();
        res.status(200).send(languages);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
