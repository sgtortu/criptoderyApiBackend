const express = require('express');
import { 
    getAllNodesController,
    getOneNodeController, 
    createNewNodeController,
    updateOneNodeController,
    deleteOneNodeController, 
} from "../../controllers/nodeController";
const auth = require("../../middleware/auth");
export const router = express.Router();

router.post('/create', auth, createNewNodeController);
router.get('/', auth, getAllNodesController);
router.get('/:nodeId', auth, getOneNodeController);
router.patch('/:nodeId', auth, updateOneNodeController);
router.delete('/:nodeId', auth, deleteOneNodeController);
