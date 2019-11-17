const express = require('express'),
	mongoose = require('mongoose'),
	cors = require('cors'),
	PORT = process.env.PORT || 5000,
	app = express();

require('dotenv').config()

require('./service/cloudinary');

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
	.then(() => {
		app.listen(PORT, process.env.IP);
	})
	.catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const projectRoute = require('./routes/project');

app.use('/api/project', projectRoute);
