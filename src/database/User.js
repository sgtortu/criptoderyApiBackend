const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllUsers = () => {
    return DB.users;
};

const getOneUser = (userId) => {
    const user = DB.users.find((user) => user.id === userId);
    if (!user) return;

    return user;
};

const createNewUser = (newUser) => {
    const isAlreadyAdded = DB.users.findIndex(
        (user) => user.username === newUser.username
    ) > -1;
    if (isAlreadyAdded) return;

    DB.users.push(newUser);
    saveToDatabase(DB);
    return newUser;
};

const updateOneUser = (userId, changes) => {
    const indexForUpdated = DB.users.findIndex(
        (user) => user.id === userId
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

const deleteOneUser = (userId) => {
    console.log('database')
    const indexForDeleted = DB.users.findIndex(
        (user) => user.id === userId
    );
    if (indexForDeleted === -1) return;

    DB.users.splice(indexForDeleted, 1);
    saveToDatabase(DB);
};

module.exports = {
    getAllUsers,
    createNewUser,
    getOneUser,
    updateOneUser,
    deleteOneUser
};
