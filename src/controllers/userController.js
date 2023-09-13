const userService = require('../services/userService');

const getAllUsers = (req, res) => {
    const allUsers = userService.getAllUsers();
    res.send({status: 'OK', data: allUsers});
};

const getOneUser = (req, res) => {
    const {
        params: { userId },
    } = req;

    if (!userId) return;

    const user = userService.getOneUser(userId);
    res.send({status: 'OK', data: user});
};

const createNewUser = (req, res) => {
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

    const createdUser = userService.createNewUser(newUser);
    res.status(201).send({status: 'OK', data: createdUser});
};

const updateOneUser = (req, res) => {
    const { 
        body, 
        params: { userId},
    } = req;

    if (!userId) return;

    const updatedUser = userService.updateOneUser(userId, body);
    res.send({status: 'OK', data: updatedUser});
};

const deleteOneUser = (req, res) => {
    const { 
        params: { userId },
    } = req;

    if (!userId) return;
    console.log('controller')

    userService.deleteOneUser(userId);
    res.status(204).send({status: 'OK'});
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};
