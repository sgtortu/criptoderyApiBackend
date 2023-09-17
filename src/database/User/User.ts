import { User } from "../../models/User";
import { connection } from "../config";
import { userQueries } from "./userQueries";

const DB = require("../db.json");
const { saveToDatabase } = require("../utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         createdAt: 
 *           type: string
 *           example: 2023-09-15T01:38:05.000Z
 *         email:
 *           type: string
 *           example: sg.tortu@gmail.com
 *         password:
 *           type: string
 *           example: Qwerty1234.
 *         status:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: santiago
 *         lastname: 
 *           type: string
 *           example: Tortu
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         profileImageUrl: 
 *           type: string
 *           example: null
 *         birthdate: 
 *           type: string
 *           example: null
 *         role: 
 *           type: string
 *           example: 1
 *         phoneNumber: 
 *           type: string
 *           example: 475349793
 *         updatedAt: 
 *           type: string
 *           example: 2023-09-15T01:38:05.000Z
 */
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query(userQueries.selectAll(), (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const getOneUser = (userId: string) => {
  const user = DB.users.find((user: any) => user.id === userId);
  if (!user) return;

  return user;
};

export const createNewUser = (newUser: User) => {
  try {
    connection.query(userQueries.create(newUser));
    return newUser;
  } catch (error: any) {
    throw { status: 500, message: error?.message || error };
  }
};

export const updateOneUser = (userId: string, changes: any) => {
  const indexForUpdated = DB.users.findIndex((user: any) => user.id === userId);
  if (indexForUpdated === -1) return;

  const updatedUser = {
    ...DB.users[indexForUpdated],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  DB.users[indexForUpdated] = updatedUser;

  try {
    saveToDatabase(DB);
    return updatedUser;
  } catch (error: any) {
    throw { status: 500, message: error?.message || error };
  }
};

export const deleteOneUser = (userId: string) => {
  const indexForDeleted = DB.users.findIndex((user: any) => user.id === userId);
  if (indexForDeleted === -1) return;

  DB.users.splice(indexForDeleted, 1);
  saveToDatabase(DB);
};
