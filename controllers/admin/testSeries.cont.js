const db = require("../../models");
const TestSeries = db.testSeries;
const makePdf = require("../../util/imageToPdf")
const path = require('path');

exports.addTestSeries = async (req, res) => {
    try {
        if (!req.files) {
            return res.send(`You must select a file.`);
        }
        let mimeType = "image";
        const fileNameArray = (req.files).map((file => { return file.path }));
        const file = (req.files).map((file => { return file.mimetype }));
        file.map((pdf)=> { 
            if(pdf==="application/pdf"){
                return mimeType = "application"
            }
        });

        const testSeries = await TestSeries.create({
            subject: req.body.subject,
            teacher: req.body.teacher,
            testSeriesNote: fileNameArray,
            mimeType: mimeType
        });
        res.status(200).send(`Test Series has been uploaded. ${testSeries.id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getTestSeries = async (req, res) => {
    try {
        let testSeries = await TestSeries.findAll();
        let index = 0;
        while(index < testSeries.length){
            let find = testSeries[index]
            if(find.mimeType==="image"){
                const imageToPdf = await makePdf.imageToPdf(find.testSeriesNote, index);
                find.dataValues.testSeriesNote = imageToPdf;
            } else{
                find.dataValues.testSeriesNote = find.testSeriesNote;
            }
            index++;
        }
        return res.status(200).send(testSeries);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}