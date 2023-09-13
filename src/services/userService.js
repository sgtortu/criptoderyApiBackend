const {v4: uuid} = require('uuid');
const User = require('../database/User');

const getAllUsers = () => {
    const allUsers = User.getAllUsers();
    return allUsers;
};

const getOneUser = (userId) => {
    const user = User.getOneUser(userId);
    return user;
};

const createNewUser = (newUser) => {
    const userToInsert = {
        ...newUser,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    };  
    createdUser = User.createNewUser(userToInsert);
    return createdUser;
};

const updateOneUser = (userId, changes) => {
    const updatedUser = User.updateOneUser(userId, changes); 
    return updatedUser;
};

const deleteOneUser = (userId) => {
    User.deleteOneUser(userId);
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};
