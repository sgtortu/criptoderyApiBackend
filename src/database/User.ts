const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

export const getAllUsers = () => {
    return DB.users;
};

export const getOneUser = (userId: string) => {
    const user = DB.users.find((user: any) => user.id === userId);
    if (!user) return;

    return user;
};

export const createNewUser = (newUser: any) => {

    const isAlreadyAdded = DB.users.findIndex(
        (user: any) => user.username === newUser.username
    ) > -1;
    if (isAlreadyAdded) return;

    DB.users.push(newUser);
    saveToDatabase(DB);
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
