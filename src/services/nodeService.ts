import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllNodesService = async () => {
    try {
        const allNodes = await prisma.node.findMany();   
        return allNodes;
    } catch (error) {
        return error;
    }
};

export const getOneNodeService = async (nodeId: number) => {
    try {
        const node = await prisma.node.findUnique({
            where: { id: nodeId }
        });
        return node;
    } catch (error) {
        return error;
    }
};

export const createNewNodeService = async (newNode: any) => {

    const nodeExist = await prisma.node.findMany({
        where: { name: newNode.name }
    });
    if (nodeExist.length) throw { message: "Node Already Exist.", status: 409 };

    const blockExist = await prisma.block.findUnique({
        where: { id: newNode.blockId }
    });
    if (!blockExist) throw { message: "Block Not Found.", status: 404 };

    const nodeToInsert: any = {
        ...newNode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };  

    try {
        const createdNode = await prisma.node.create({data: nodeToInsert});
        return createdNode;
    } catch (error) {
        throw { error, status: 500 };
    }
};

export const updateOneNodeService = async (nodeId: number, changes: any) => {

    const nodeExist = await prisma.node.findUnique({
        where: { id: nodeId }
    });
    if (!nodeExist) throw { message: "Node Not Found.", status: 404 };

    const blockExist = await prisma.block.findUnique({
        where: { id: changes.blockId }
    });
    if (!blockExist) throw { message: "Block Not Found.", status: 404 };

    const updatedNode = await prisma.node.update({
        where: { id: nodeId },
        data: {
            ...changes,
            updatedAt: new Date().toISOString(),
        },
    }); 
    return updatedNode;
};

export const deleteOneNodeService = async (nodeId: number) => {
    await prisma.node.delete({ where: { id: nodeId }});
};
