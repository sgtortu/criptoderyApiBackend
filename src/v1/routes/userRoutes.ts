const express = require('express');
import { 
    getAllUsersController,
    getOneUserController, 
    createNewUserController,
    updateOneUserController,
    deleteOneUserController, 
    loginController
} from "../../controllers/userController";
const auth = require("../../middleware/auth");
export const router = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/User"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get('/', auth, getAllUsersController);
router.get('/:userId', auth, getOneUserController);
router.post('/register', createNewUserController);
router.patch('/:userId', auth, updateOneUserController);
router.delete('/:userId', auth, deleteOneUserController);
router.post('/login', loginController);
