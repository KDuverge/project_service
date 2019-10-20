const jwt = require('jsonwebtoken'),
	{ SECRET_KEY } = require('../config');

async function isAuthenticated(req, res, next) {
	const token = req.headers['x-auth-token'];

	if (!token) throw new Error('No token has been provided.');

	const { isAdmin } = await jwt.verify(token, SECRET_KEY);

	if (isAdmin) return next();

	throw new Error('You are not authorized to access this route.');
}

module.exports = {
	isAuthenticated
};
