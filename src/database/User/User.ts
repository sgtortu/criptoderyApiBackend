import { User } from "../../models/User";
import { connection } from "../config";
import { userQueries } from "./userQueries";

const DB = require('../db.json');
const { saveToDatabase } = require('../utils');

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        connection.query(userQueries.selectAll(), (error, result) => {
            if (error) {
                reject(error);
            } else {
                console.log('result', result)
                resolve(result);
            }
        });
    });
};

export const getOneUser = (userId: string) => {
    const user = DB.users.find((user: any) => user.id === userId);
    if (!user) return;

    return user;
};

export const createNewUser = (newUser: User) => {
    connection.query(userQueries.create(newUser));
    return newUser;
};

export const updateOneUser = (userId: string, changes: any) => {
    const indexForUpdated = DB.users.findIndex(
        (user: any) => user.id === userId
    );
    if (indexForUpdated === -1) return;
    
    const updatedUser = {
        ...DB.users[indexForUpdated],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    }

    DB.users[indexForUpdated] = updatedUser;
    saveToDatabase(DB);
    return updatedUser;
};

export const deleteOneUser = (userId: string) => {
    const indexForDeleted = DB.users.findIndex(
        (user: any) => user.id === userId
    );
    if (indexForDeleted === -1) return;

    DB.users.splice(indexForDeleted, 1);
    saveToDatabase(DB);
};
