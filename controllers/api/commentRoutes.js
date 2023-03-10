const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Create a new comment for a project
router.post('/project/:id/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      project_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


  module.exports = router;
