import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt');
const {v4: uuid} = require('uuid');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

export const getAllUsersService = async () => {
    try {
        const allUsers = await prisma.user.findMany();   
        return allUsers;
    } catch (error) {
        return error;
    }
};

export const getOneUserService = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        return user;
    } catch (error) {
        return error;
    }
};

export const createNewUserService = async (newUser: any) => {

    const userExist = await prisma.user.findMany({
        where: { email: newUser.email }
    });
    if (userExist.length) throw { message: "User Already Exist.", status: 409 };
    
    const encryptedPassword = await bcrypt.hash(newUser.password, 10);
    const userId = uuid();

    const token = jwt.sign({ 
            user_id: userId, 
            email: newUser.email,
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        });
    const userToInsert: any = {
        ...newUser,
        password: encryptedPassword,
        id: uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,   
        status: 1,
        role: '1',
        token: token,
    };  

    try {
        const createdUser = await prisma.user.create({data: userToInsert});
        return createdUser;
    } catch (error) {
        throw { error, status: 500 };
    }
};

export const updateOneUserService = async (userId: string, changes: any) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: changes,
    }); 
    return updatedUser;
};

export const deleteOneUserService = async (userId: string) => {
    await prisma.user.delete({ where: { id: userId }});
};

export const loginService = async (email: string, password: string) => {
    const user = await prisma.user.findMany({
        where: { email: email }
    });

    if (user[0] && (await bcrypt.compare(password, user[0].password))) {
        const token = jwt.sign(
          { user_id: user[0].id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        user[0].token = token;
  
        return user;
    }
    throw { error: "Invalid Credentials", status: 400 };
};
