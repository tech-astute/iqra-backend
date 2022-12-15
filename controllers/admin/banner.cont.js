const db = require("../../models");
const fileHelper = require("../../util/delete.file");
const Banner = db.banner;

exports.addBanner = async (req, res) => {
  try {
    //console.log(req.file);

    if (!req.file) {
      return res.send(`You must select a Image.`);
    }

    const banners = await Banner.create({
      bannerImage: req.file.filename
    });
    res.status(200).send(`Banner has been uploaded. ${banners.id}`);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllBanner = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.status(200).send(banners);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.deleteBanner = async (req, res) => {
  try {

    const id = req.params.id;
    const banners = await Banner.findOne({ where: { id: id } });
    if (!banners) {
      //console.log(`Id is not present`);
      return res.send(`Fail to delete: Id is not present`);
    }
    fileHelper.deleteFile(banners.bannerImage);
    
    await banners.destroy();
    res.status(200).send(`Banner deleted with Id: ${id}`);
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.updateBanner = async (req, res) => {
  try {

    let imagePath;
    const id = req.params.id;
    const banners = await Banner.findOne({ where: { id: id } });
    if (!banners) {
      //console.log(`Id is not present`);
      return res.send(`Fail to update: Id is not present`);
    }
    if (req.file) {
      fileHelper.deleteFile(banners.bannerImage);
      imagePath = req.file.filename;
    }
    await banners.update({
      bannerImage: imagePath
    });
    res.status(200).send(`Banner updated with Id: ${id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};