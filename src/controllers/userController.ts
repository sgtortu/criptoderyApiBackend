import { Request, Response } from "express";
import {
  createNewUserService,
  deleteOneUserService,
  getAllUsersService,
  getOneUserService,
  updateOneUserService,
} from "../services/userService";

export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const allUsers = await getAllUsersService();
    res.send({ status: "OK", data: allUsers });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const getOneUserController = (req: Request, res: Response) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':userId' can not be empty",
      },
    });
  }

  try {
    const user = getOneUserService(userId);
    res.send({ status: "OK", data: user });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewUserController = (req: Request, res: Response) => {
  const { body } = req;

  if (!body.name || !body.lastname || !body.email || !body.password) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'lastname', 'email', 'password'",
      },
    });
  }

  const newUser = {
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    password: body.password,
  };

  try {
    const createdUser = createNewUserService(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneUserController = (req: Request, res: Response) => {
  const {
    body,
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':userId' can not be empty",
      },
    });
  }

  try {
    const updatedUser = updateOneUserService(userId, body);
    res.send({ status: "OK", data: updatedUser });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneUserController = (req: Request, res: Response) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Parameter ':userId' can not be empty",
      },
    });
  }

  try {
    deleteOneUserService(userId);
    res.status(204).send({ status: "OK" });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
