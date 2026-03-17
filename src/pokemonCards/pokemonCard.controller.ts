import prisma from '../client'
import { Request, Response } from 'express'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


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
    return
  }

  res.status(200).json(pokemon)
}

export const createPokemonCard = async (req: Request, res: Response): Promise<void> => {
  const { name, pokedexId, type, lifePoints, size, weight, imageUrl } = req.body

  const pokemon = await prisma.pokemonCard.create({
    data: {
      name,
      pokedexId,
      lifePoints,
      size,
      weight,
      imageUrl,
      typeId: type
    },
    include: { type: true }
  })

  res.status(201).json(pokemon)
}

export const updatePokemonCard = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.pokemonCardId)

  try {
    const updated = await prisma.pokemonCard.update({
      where: { id },
      data: req.body,
      include: { type: true }
    })

    res.status(200).json(updated)
  } catch {
    res.status(404).json({
      message: `PokemonCard with id ${id} not found`
    })
  }
}

export const deletePokemonCard = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.pokemonCardId)

  try {
    await prisma.pokemonCard.delete({
      where: { id }
    })

    res.status(204).send()
  } catch {
    res.status(404).json({
      message: `PokemonCard with id ${id} not found`
    })
  }
}