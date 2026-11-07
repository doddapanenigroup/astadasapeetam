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

// Protected routes (Admin, Digital Marketing, Astrologer)
router.use(protect);
router.post('/', authorize('admin', 'digital_marketing', 'astrologer'), createPost);
router.put('/:id', authorize('admin', 'digital_marketing', 'astrologer'), updatePost);
router.delete('/:id', authorize('admin', 'digital_marketing'), deletePost);

module.exports = router;
