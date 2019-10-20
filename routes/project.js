const router = require('express').Router(),
  projectController = require('../controllers/project'),
  { isAuthenticated } = require('../middleware/auth'),
  { handleError } = require('../service/error'),
  { upload } = require('../service/cloudinary');

router
  .route('/')
  .get(handleError(projectController.getProjects))
  .post(
    upload.single('image_url'),
    handleError(projectController.createProject)
  );

router
  .use(handleError(isAuthenticated))
  .route('/:_id')
  .get(handleError(projectController.getSingleProject))
  .put(handleError(projectController.updateProject))
  .delete(handleError(projectController.removeProject));

module.exports = router;
