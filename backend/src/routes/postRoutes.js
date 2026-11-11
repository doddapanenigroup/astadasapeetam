const express = require('express');
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

// Protected routes (Admin, Editor, Digital Marketing, Astrologer)
router.use(protect);
router.post('/', authorize('admin', 'editor', 'digital_marketing', 'astrologer'), createPost);
router.put('/:id', authorize('admin', 'editor', 'digital_marketing', 'astrologer'), updatePost);
router.delete('/:id', authorize('admin', 'editor', 'digital_marketing'), deletePost);

module.exports = router;
