import { Request, Response } from "express";
import {
  createNewCardService,
  deleteOneCardService,
  getAllCardsService,
  getOneCardService,
  updateOneCardService,
} from "../services/cardService";

export const getAllCardsController = async (_req: Request, res: Response) => {
  try {
    const allCards = await getAllCardsService();
    res.send({ status: "OK", data: allCards });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getOneCardController = async (req: Request, res: Response) => {
  const {
    params: { cardId },
  } = req;

  if (!cardId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':cardId' can not be empty",
      },
    });
  }

  try {
    const card = await getOneCardService(Number(cardId));
    res.send({ status: "OK", data: card });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewCardController = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body.userId || !body.type || !body.status || !body.nodeId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'type', 'userId', 'status', 'nodeId'",
      },
    });
  }

  try {
    const createdCard = await createNewCardService(body);
    res.status(201).send({ status: "OK", data: createdCard });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneCardController = async (req: Request, res: Response) => {
  const {
    body,
    params: { cardId },
  } = req;

  if (!cardId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':cardId' can not be empty",
      },
    });
  }

  try {
    const updatedCard = await updateOneCardService(Number(cardId), body);
    res.send({ status: "OK", data: updatedCard });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneCardController = async (req: Request, res: Response) => {
  const {
    params: { cardId },
  } = req;

  if (!cardId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':cardId' can not be empty",
      },
    });
  }

  try {
    await deleteOneCardService(Number(cardId));
    res.status(204).send({ status: "OK" });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
