const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// GET all comments of a post (anyone)
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ADD a comment (login required)
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ msg: 'Comment text is required' });
    }
    const comment = await Comment.create({
      text,
      post: req.params.postId,
      author: req.user.id
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE a comment (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await comment.deleteOne();
    res.json({ msg: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;