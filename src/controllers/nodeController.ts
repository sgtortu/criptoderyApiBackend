import { Request, Response } from "express";
import {
  createNewNodeService,
  deleteOneNodeService,
  getAllNodesService,
  getOneNodeService,
  updateOneNodeService,
} from "../services/nodeService";

export const getAllNodesController = async (_req: Request, res: Response) => {
  try {
    const allNodes = await getAllNodesService();
    res.send({ status: "OK", data: allNodes });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getOneNodeController = async (req: Request, res: Response) => {
  const {
    params: { nodeId },
  } = req;

  if (!nodeId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':nodeId' can not be empty",
      },
    });
  }

  try {
    const node = await getOneNodeService(Number(nodeId));
    res.send({ status: "OK", data: node });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewNodeController = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body.name || !body.icon || !body.userId || !body.blockId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'icon', 'userId', 'blockId'",
      },
    });
  }

  const newNode = {
    name: body.name,
    icon: body.icon,
    userId: body.userId,
    blockId: body.blockId,
  };

  try {
    const createdNode = await createNewNodeService(newNode);
    res.status(201).send({ status: "OK", data: createdNode });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneNodeController = async (req: Request, res: Response) => {
  const {
    body,
    params: { nodeId },
  } = req;

  if (!nodeId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':nodeId' can not be empty",
      },
    });
  }

  try {
    const updatedNode = await updateOneNodeService(Number(nodeId), body);
    res.send({ status: "OK", data: updatedNode });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneNodeController = async (req: Request, res: Response) => {
  const {
    params: { nodeId },
  } = req;

  if (!nodeId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':nodeId' can not be empty",
      },
    });
  }

  try {
    await deleteOneNodeService(Number(nodeId));
    res.status(204).send({ status: "OK" });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
