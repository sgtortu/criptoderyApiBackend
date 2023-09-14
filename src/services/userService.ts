import { createNewUser, deleteOneUser, getAllUsers, getOneUser, updateOneUser } from "../database/User";

const {v4: uuid} = require('uuid');

export const getAllUsersService = () => {
    const allUsers = getAllUsers();
    return allUsers;
};

export const getOneUserService = (userId: string) => {
    const user = getOneUser(userId);
    return user;
};

export const createNewUserService = (newUser: any) => {
    const userToInsert = {
        ...newUser,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
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
