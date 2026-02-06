import { Router } from "express"
import {
  getAllPokemonCards,
  getPokemonCardById,
  createPokemonCard,
  updatePokemonCard,
  deletePokemonCard
} from "./pokemonCard.controller.js"

export const pokemonCardRouter = Router()

pokemonCardRouter.get("/", getAllPokemonCards)
pokemonCardRouter.get("/:pokemonCardId", getPokemonCardById)
pokemonCardRouter.post("/", createPokemonCard)
pokemonCardRouter.patch("/:pokemonCardId", updatePokemonCard)
pokemonCardRouter.delete("/:pokemonCardId", deletePokemonCard)

