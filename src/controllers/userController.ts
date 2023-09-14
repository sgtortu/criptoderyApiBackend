import { Request, Response } from "express";
import { createNewUserService, deleteOneUserService, getAllUsersService, getOneUserService, updateOneUserService } from "../services/userService";

export const getAllUsersController = (_req: Request, res: Response) => {
    const allUsers = getAllUsersService();
    res.send({status: 'OK', data: allUsers});
};

export const getOneUserController = (req: Request, res: Response) => {
    const {
        params: { userId },
    } = req;

    if (!userId) return;

    const user = getOneUserService(userId);
    res.send({status: 'OK', data: user});
};

export const createNewUserController = (req: Request, res: Response) => {
    const { body } = req;

    if (
        !body.username ||        
        !body.email ||        
        !body.password        
    ) {
        return;
    }

    const newUser = {
        username: body.username,
        email: body.email,
        password: body.password,
    }

    const createdUser = createNewUserService(newUser);
    res.status(201).send({status: 'OK', data: createdUser});
};

export const updateOneUserController = (req: Request, res: Response) => {
    const { 
        body, 
        params: { userId},
    } = req;

    if (!userId) return;

    const updatedUser = updateOneUserService(userId, body);
    res.send({status: 'OK', data: updatedUser});
};

export const deleteOneUserController = (req: Request, res: Response) => {
    const { 
        params: { userId },
    } = req;

    if (!userId) return;
    console.log('controller')

    deleteOneUserService(userId);
    res.status(204).send({status: 'OK'});
};
