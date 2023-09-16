import { createNewUser, deleteOneUser, getAllUsers, getOneUser, updateOneUser } from "../database/User/User";
import { User } from "../models/User";

const {v4: uuid} = require('uuid');

export const getAllUsersService = async () => {
    try {
        const allUsers = await getAllUsers();        
        return allUsers;
    } catch (error) {
        return error;
    }
};

export const getOneUserService = (userId: string) => {
    const user = getOneUser(userId);
    return user;
};

export const createNewUserService = (newUser: User) => {
    const userToInsert: User = {
        ...newUser,
        id: uuid(),
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        isDeleted: 0,
        status: 1,
        role: '1',
    };  
    const createdUser = createNewUser(userToInsert);
    return createdUser;
};

export const updateOneUserService = (userId: string, changes: any) => {
    const updatedUser = updateOneUser(userId, changes); 
    return updatedUser;
};

export const deleteOneUserService = (userId: string) => {
    deleteOneUser(userId);
};
