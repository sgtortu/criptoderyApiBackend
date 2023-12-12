import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCardsService = async () => {
    try {
        const allCards = await prisma.card.findMany();   
        return allCards;
    } catch (error) {
        return error;
    }
};

export const getOneCardService = async (cardId: number) => {
    try {
        const card = await prisma.card.findUnique({
            where: { id: cardId }
        });
        return card;
    } catch (error) {
        return error;
    }
};

export const createNewCardService = async (newCard: any) => {
    const nodeExist = await prisma.node.findUnique({
        where: { id: newCard.nodeId }
    });
    if (!nodeExist) throw { message: "Node Not Found.", status: 404 };

    const cardToInsert: any = {
        ...newCard,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };  
    try {
        const createdCard = await prisma.card.create({data: cardToInsert});
        return createdCard;
    } catch (error) {
        throw { error, status: 500 };
    }
};

export const updateOneCardService = async (cardId: number, changes: any) => {

    const cardExist = await prisma.card.findUnique({
        where: { id: cardId }
    });
    if (!cardExist) throw { message: "Card Not Found.", status: 404 };

    const updatedCard = await prisma.card.update({
        where: { id: cardId },
        data: {
            ...changes,
            updatedAt: new Date().toISOString(),
        },
    }); 
    return updatedCard;
};

export const deleteOneCardService = async (cardId: number) => {
    await prisma.card.delete({ where: { id: cardId }});
};
