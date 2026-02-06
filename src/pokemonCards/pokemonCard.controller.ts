import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const getAllPokemonCards = async (req: Request, res: Response): Promise<void> => {
  const pokemons = await prisma.pokemonCard.findMany({
    include: { type: true }
  })
  res.status(200).json(pokemons)
}

export const getPokemonCardById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.pokemonCardId)

  const pokemon = await prisma.pokemonCard.findUnique({
    where: { id },
    include: { type: true }
  })

  if (!pokemon) {
    res.status(404).json({
      message: `PokemonCard with id ${id} not found`
    })
  }

  res.status(200).json(pokemon)
}

export const createPokemonCard = async (req: Request, res: Response): Promise<void> => {
  const { name, pokedexId, type, lifePoints, size, weight, imageUrl } = req.body

  // Vérification champs requis
  if (!name || !pokedexId || !type || !lifePoints) {
    res.status(400).json({
      message: "Missing required fields"
    })
  }

  // Vérifier si type existe
  const typeExists = await prisma.type.findUnique({
    where: { id: type }
  })

  if (!typeExists) {
    res.status(400).json({
      message: `Type with id ${type} does not exist`
    })
  }

  // Vérifier doublon name ou pokedexId
  const duplicate = await prisma.pokemonCard.findFirst({
    where: {
      OR: [
        { name },
        { pokedexId }
      ]
    }
  })

  if (duplicate) {
    res.status(400).json({
      message: "Pokemon with same name or pokedexId already exists"
    })
  }

  const pokemon = await prisma.pokemonCard.create({
    data: {
      name,
      pokedexId,
      lifePoints,
      size,
      weight,
      imageUrl,
      typeId: type
    }
  })

  res.status(201).json(pokemon)
}

export const updatePokemonCard = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.pokemonCardId)

  const existing = await prisma.pokemonCard.findUnique({
    where: { id }
  })

  if (!existing) {
    res.status(404).json({
      message: `PokemonCard with id ${id} not found`
    })
  }

  const updated = await prisma.pokemonCard.update({
    where: { id },
    data: req.body
  })

  res.status(200).json(updated)
}

export const deletePokemonCard = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.pokemonCardId)

  const existing = await prisma.pokemonCard.findUnique({
    where: { id }
  })

  if (!existing) {
    res.status(404).json({
      message: `PokemonCard with id ${id} not found`
    })
  }

  await prisma.pokemonCard.delete({
    where: { id }
  })

  res.status(200).json({
    message: "Pokemon deleted successfully"
  })
}
