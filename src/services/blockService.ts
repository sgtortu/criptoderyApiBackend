import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllBlocksService = async () => {
    try {
        const allBlocks = await prisma.block.findMany();   
        return allBlocks;
    } catch (error) {
        return error;
    }
};

export const getOneBlockService = async (blockId: number) => {
    try {
        const block = await prisma.block.findUnique({
            where: { id: blockId }
        });
        return block;
    } catch (error) {
        return error;
    }
};

export const createNewBlockService = async (newBlock: any) => {

    const blockExist = await prisma.block.findMany({
        where: { name: newBlock.name }
    });
    if (blockExist.length) throw { message: "Block Already Exist.", status: 409 };

    const blockToInsert: any = {
        ...newBlock,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };  

    try {
        const createdBlock = await prisma.block.create({data: blockToInsert});
        return createdBlock;
    } catch (error) {
        throw { error, status: 500 };
    }
};

export const updateOneBlockService = async (blockId: number, changes: any) => {
    const updatedBlock = await prisma.block.update({
        where: { id: blockId },
        data: {
            ...changes,
            updatedAt: new Date().toISOString(),
        },
    }); 
    return updatedBlock;
};

export const deleteOneBlockService = async (blockId: number) => {
    await prisma.block.delete({ where: { id: blockId }});
};
