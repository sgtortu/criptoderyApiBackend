const express = require('express');
import { 
    getAllCardsController,
    getOneCardController, 
    createNewCardController,
    updateOneCardController,
    deleteOneCardController, 
} from "../../controllers/cardController";
const auth = require("../../middleware/auth");
export const router = express.Router();

router.post('/create', auth, createNewCardController);
router.get('/', auth, getAllCardsController);
router.get('/:cardId', auth, getOneCardController);
router.patch('/:cardId', auth, updateOneCardController);
router.delete('/:cardId', auth, deleteOneCardController);
