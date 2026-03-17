import { Request, Response } from "express"
import prisma from "../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" })
    return
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    res.status(400).json({ message: "Email already used" })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  res.status(201).json(user)
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {

  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" })
    return
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    res.status(401).json({ message: "Invalid credentials" })
    return
  }

  const token = jwt.sign({ userId: user.id }, "secret")

  res.status(200).json({ token })
}