const express = require('express');
import { 
    getAllUsersController,
    getOneUserController, 
    createNewUserController,
    updateOneUserController,
    deleteOneUserController
} from "../../controllers/userController";

const router = express.Router();
router
    .get('/', getAllUsersController)
    .get('/:userId', getOneUserController)
    .post('/', createNewUserController)
    .patch('/:userId', updateOneUserController)
    .delete('/:userId', deleteOneUserController);

module.exports = router;
