const express = require('express');
const router = express.Router();
const userRoutes = require('../../controllers/userController');

router
    .get('/', userRoutes.getAllUsers)
    .get('/:userId', userRoutes.getOneUser)
    .post('/', userRoutes.createNewUser)
    .patch('/:userId', userRoutes.updateOneUser)
    .delete('/:userId', userRoutes.deleteOneUser);

module.exports = router;
