const express = require('express');
const { 
  getAllUsers, 
  createStaffUser,
  updateUserRole, 
  toggleUserStatus, 
  getAdminDashboardStats 
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

// All admin routes require authentication & 'admin' role
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminDashboardStats);
router.get('/users', getAllUsers);
router.post('/users', createStaffUser);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/status', toggleUserStatus);

module.exports = router;
