const cloudinary = require("cloudinary").v2;
const path = require("path");
const Datauri = require('datauri/parser');

cloudinary.config({
  cloud_name: "simonkalmar",
  api_key: "326382768643178",
  api_secret: "HB_HI4gbJ7UZznYGXDfdXPX9Mzk",
});

module.exports.upload = async (req) => {
  let dUri = new Datauri();

  let file = await dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );

  try {
    return await cloudinary.uploader.upload(file.content, {
      folder: `heimdall/`,
    });
  } catch {
    return;
  }
};
