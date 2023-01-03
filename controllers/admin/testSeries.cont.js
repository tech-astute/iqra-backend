const db = require("../../models");
const TestSeries = db.testSeries;

exports.addTestSeries = async (req, res) => {
    try {
        if (!req.files) {
            return res.send(`You must select a file.`);
        }
        const fileNameArray = (req.files).map((file => { return file.filename }));
        console.log(fileNameArray)
        // const fileNameSting = fileNameArray.toString();

        const testSeries = await TestSeries.create({
            subject: req.body.subject,
            teacher: req.body.teacher,
            testSeriesNote: fileNameArray
        });
        res.status(200).send(`Test Series has been uploaded. ${testSeries.id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getTestSeries = async (req, res) => {
    try {
        const testSeries = await TestSeries.findAll();
        const fileNameArray = (testSeries).map((file => { return file.testSeriesNote }));
        // res.status(200).send({testSeriesNote: fileNameArray});
        //const a = testSeries.testSeriesNote;
        console.log(fileNameArray);
        console.log(typeof fileNameArray)
        res.status(200).send(testSeries);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}