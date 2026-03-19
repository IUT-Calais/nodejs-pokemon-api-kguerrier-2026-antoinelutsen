import { Router } from "express"
import { createUser, loginUser } from "./user.controller"

const userRouter = Router()

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
userRouter.post("/", createUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connexion utilisateur
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Token JWT
 *       401:
 *         description: Non autorisé
 */
userRouter.post("/login", loginUser)

export default userRouter
