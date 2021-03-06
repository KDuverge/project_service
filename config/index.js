const CLOUDINARY = {
	CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	API_KEY: process.env.CLOUDINARY_API_KEY,
	API_SECRET: process.env.CLOUDINARY_API_SECRET
};

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
	MONGO_URI,
	CLOUDINARY,
	SECRET_KEY
};
