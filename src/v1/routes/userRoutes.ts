const express = require('express');
import { 
    getAllUsersController,
    getOneUserController, 
    createNewUserController,
    updateOneUserController,
    deleteOneUserController
} from "../../controllers/userController";

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
router.get('/', getAllUsersController);
router.get('/:userId', getOneUserController);
router.post('/', createNewUserController);
router.patch('/:userId', updateOneUserController);
router.delete('/:userId', deleteOneUserController);
