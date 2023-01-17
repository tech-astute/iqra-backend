const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const imageToPdf = async (array, index) => {
    let updatedArr = []
    await uploadFileToPdf(array, index).then(result =>{
        updatedArr.push(result.path);
    })
    .catch(error =>{
        console.log("error: ", error);
    })
    return updatedArr;
}

const uploadFileToPdf = (array, index) => {
    return new Promise(async (resolve, reject) => {
        const doc = new PDFDocument({ size: 'A4' })
        const createdFile = await doc.pipe(fs.createWriteStream(path.join(`${__dirname}/../resources/upload.pdf/testSeriesNote${index}.pdf`)))
        let i = 0;
        while (i < array.length) {
            let filePath = array[i];
            console.log(filePath);
            doc
            // .addPage()
                .image(filePath, {
                    fit: [500, 400],
                    align: 'center',
                    valign: 'center'
                })
                .addPage();
            i++;
        }
        if(i == array.length) {
            doc.end()
            resolve(createdFile)
        }
        else reject(false)
    })
}

exports.imageToPdf = imageToPdf;