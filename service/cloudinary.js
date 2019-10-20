const multer = require('multer'),
  cloudinary = require('cloudinary'),
  { CLOUDINARY } = require('../config');

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET
});

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i))
    cb(new Error('Only image files are allowed!'), false);

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

class CloudinaryUpload {
  constructor(filepath, title) {
    this.filepath = filepath;
    this.title = title;
  }

  upload() {
    return cloudinary.v2.uploader.upload(
      this.filepath,
      {
        public_id: this.title,
        quality: 'auto'
      },
      (error, result) => {
        return new Promise((resolve, reject) => {
          if (!error) resolve(result);

          return reject(error.message);
        });
      }
    );
  }

  static delete(public_id) {
    return cloudinary.v2.uploader.destroy(public_id, (error, result) => {
      return new Promise((resolve, reject) => {
        if (!error) resolve(result);

        return reject('Error deleting image...');
      });
    });
  }
}

module.exports = {
  upload,
  CloudinaryUpload
};
