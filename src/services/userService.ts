import { PrismaClient } from "@prisma/client";

const {v4: uuid} = require('uuid');
const prisma = new PrismaClient();

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

    const userToInsert: any = {
        ...newUser,
        id: uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDeleted: false,
        status: 1,
        role: '1',
    };  
    try {
        const createdUser = await prisma.user.create({data: userToInsert});
        return createdUser;
    } catch (error) {
        return error;
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
