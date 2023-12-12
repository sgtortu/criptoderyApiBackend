import { Request, Response } from "express";
import {
  createNewBlockService,
  deleteOneBlockService,
  getAllBlocksService,
  getOneBlockService,
  updateOneBlockService,
} from "../services/blockService";

export const getAllBlocksController = async (_req: Request, res: Response) => {
  try {
    const allBlocks = await getAllBlocksService();
    res.send({ status: "OK", data: allBlocks });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getOneBlockController = async (req: Request, res: Response) => {
  const {
    params: { blockId },
  } = req;

  if (!blockId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':blockId' can not be empty",
      },
    });
  }

  try {
    const block = await getOneBlockService(Number(blockId));
    res.send({ status: "OK", data: block });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewBlockController = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body.name || !body.icon || !body.userId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'icon', 'userId'",
      },
    });
  }

  const newBlock = {
    name: body.name,
    icon: body.icon,
    userId: body.userId,
  };

  try {
    const createdBlock = await createNewBlockService(newBlock);
    res.status(201).send({ status: "OK", data: createdBlock });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneBlockController = async (req: Request, res: Response) => {
  const {
    body,
    params: { blockId },
  } = req;

  if (!blockId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':blockId' can not be empty",
      },
    });
  }

  try {
    const updatedBlock = await updateOneBlockService(Number(blockId), body);
    res.send({ status: "OK", data: updatedBlock });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneBlockController = async (req: Request, res: Response) => {
  const {
    params: { blockId },
  } = req;

  if (!blockId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':blockId' can not be empty",
      },
    });
  }

  try {
    await deleteOneBlockService(Number(blockId));
    res.status(204).send({ status: "OK" });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
