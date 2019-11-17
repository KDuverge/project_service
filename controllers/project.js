const Project = require('../models/Project'),
  { CloudinaryUpload } = require('../service/cloudinary');

async function getProjects(req, res, next) {
  const projects = await Project.find()
    .select('-__v')
    .exec();

  return res.status(200).json({
    message: 'GET /api/project',
    projects
  });
}

async function createProject(req, res, next) {
  let { title, description, github_link, website_link, tags } = req.body;
  const { path } = req.file;

  tags = tags.split(',');

  const project_image = new CloudinaryUpload(path, title);

  const { secure_url: image_url } = await project_image.upload();
  const created_project = await Project.create({
    title,
    description,
    image_url,
    github_link,
    website_link,
    tags
  });

  const project = await created_project.save();


  return res.status(203).json({
    _status: {
      msg: 'Project Uploaded Successful',
      className: 'success'
    },
    message: 'POST /api/project',
    project
  });
}

async function removeProject(req, res, next) {
  const { _id } = req.params;

  const deletedProject = await Project.findByIdAndRemove(_id);

  await CloudinaryUpload.delete(deletedProject.title);

  return res.status(201).json({
    _status: {
      msg: 'Project Deleted Successful',
      className: 'success'
    },
    message: `DELETE /api/project/${_id}`,
    deletedProject
  });
}

async function getSingleProject(req, res, next) {
  const { _id } = req.params;

  const project = await Project.findById(_id);

  return res.status(200).json({
    _status: {
      msg: 'Project Found Successful',
      className: 'success'
    },
    message: `GET /api/project/${_id}`,
    project
  });
}

async function updateProject(req, res, next) {
  const { _id } = req.params;

  const project = await Project.findByIdAndUpdate(_id, req.body, {
    new: true
  }).exec();

  return res.status(202).json({
    _status: {
      msg: 'Project Updated Successful',
      className: 'success'
    },
    message: `PUT /api/project/${_id}`,
    project
  });
}

module.exports = {
  getProjects,
  createProject,
  removeProject,
  updateProject,
  getSingleProject
};
