const express = require('express');
import { 
    getAllBlocksController,
    getOneBlockController, 
    createNewBlockController,
    updateOneBlockController,
    deleteOneBlockController, 
} from "../../controllers/blockController";
const auth = require("../../middleware/auth");
export const router = express.Router();

router.post('/create', auth, createNewBlockController);
router.get('/', auth, getAllBlocksController);
router.get('/:blockId', auth, getOneBlockController);
router.patch('/:blockId', auth, updateOneBlockController);
router.delete('/:blockId', auth, deleteOneBlockController);
