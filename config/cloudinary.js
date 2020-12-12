const cloudinary = require("cloudinary").v2;
const path = require("path");
const Datauri = require("datauri");

cloudinary.config({
  cloud_name: "dfhjofqok",
  api_key: "326382768643178",
  api_secret: "HB_HI4gbJ7UZznYGXDfdXPX9Mzk",
});

module.exports.upload = async (req) => {
  const dUri = new Datauri();

  let file = dUri.format(
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
