const express = require('express');
const { getHomePage, getHoiDanIt, postCreatUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser, postHandleRemoveUser } = require('../controllers/homeControlker');
const router = express.Router();
// Trang chủ
router.get('/', getHomePage);

// Trang "Hoi Dan IT"
router.get('/hoidanit', getHoiDanIt);

// Trang tạo người dùng
router.get('/create', getCreatePage);

// Trang cập nhật người dùng
router.get('/update/:id', getUpdatePage);

// Xử lý tạo người dùng
router.post('/create-user', postCreatUser);

// Xử lý cập nhật người dùng
router.post('/update-user', postUpdateUser);

// Xoá người dùng theo ID từ URL
router.post('/delete-user/:id', postDeleteUser);
module.exports = router;