const express = require('express');
const { getHomePage, getHoiDanIt, postCreatUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser, postHandleRemoveUser } = require('../controllers/homeControlker');
const router = express.Router();

router.get('/', getHomePage);
router.get('/hoidanit', getHoiDanIt);

router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage)

router.post('/create-user', postCreatUser);

router.post('/update-user', postUpdateUser);

router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);
module.exports = router;