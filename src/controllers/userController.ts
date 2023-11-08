import { Request, Response } from "express";
import {
  createNewUserService,
  deleteOneUserService,
  getAllUsersService,
  getOneUserService,
  updateOneUserService,
  loginService,
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

export const getOneUserController = async (req: Request, res: Response) => {
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
    const user = await getOneUserService(userId);
    res.send({ status: "OK", data: user });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const createNewUserController = async (req: Request, res: Response) => {
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
    email: body.email.toLowerCase(),
    password: body.password,
  };

  try {
    const createdUser = await createNewUserService(newUser);
    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneUserController = async (req: Request, res: Response) => {
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
    const updatedUser = await updateOneUserService(userId, body);
    res.send({ status: "OK", data: updatedUser });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneUserController = async (req: Request, res: Response) => {
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
    await deleteOneUserService(userId);
    res.status(204).send({ status: "OK" });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("All input is required");
  }

  try {
    const loggedUser = await loginService(email, password);
    res.send({ status: "OK", data: loggedUser });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
