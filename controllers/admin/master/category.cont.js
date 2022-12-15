const db = require("../../../models");
const fileHelper = require("../../../util/delete.file");
const Category = db.category;

exports.addCategory = async (req, res) => {
  try {
    //console.log(req.file);

    if (!req.file) {
      return res.send(`You must select a Image.`);
    }

    const categories = await Category.create({
      category: req.body.category,
      categoryimage: req.file.filename
    });
    res.status(200).send(`Category has been uploaded. ${categories.id}`);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.deleteCategory = async (req, res) => {
  try {

    const id = req.params.id;
    const categories = await Category.findOne({ where: { id: id } });
    if (!categories) {
      //console.log(`Id is not present`);
      return res.send(`Fail to delete: Id is not present`);
    }
    fileHelper.deleteFile(categories.categoryimage);
    
    await categories.destroy();
    res.status(200).send(`Category deleted with Id: ${id}`);
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.updateCategory = async (req, res) => {
  try {

    let imagePath;
    const id = req.params.id;
    const categories = await Category.findOne({ where: { id: id } });
    if (!categories) {
      //console.log(`Id is not present`);
      return res.send(`Fail to update: Id is not present`);
    }
    if (req.file) {
      fileHelper.deleteFile(categories.categoryimage);
      imagePath = req.file.filename;
    }
    await categories.update({
      category: req.body.category,
      categoryimage: imagePath
    });
    res.status(200).send(`Category updated with Id: ${id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};