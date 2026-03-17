import { Router } from "express"
import { authenticateToken } from "../middlewares/auth.middleware"
import {
  getAllPokemonCards,
  getPokemonCardById,
  createPokemonCard,
  updatePokemonCard,
  deletePokemonCard
} from "./pokemonCard.controller"

const pokemonCardRouter = Router()

pokemonCardRouter.get("/", getAllPokemonCards)
pokemonCardRouter.get("/:pokemonCardId", getPokemonCardById)
pokemonCardRouter.post("/", createPokemonCard)
pokemonCardRouter.patch("/:pokemonCardId", updatePokemonCard)
pokemonCardRouter.delete("/:pokemonCardId", deletePokemonCard)
pokemonCardRouter.post("/", authenticateToken, createPokemonCard)
pokemonCardRouter.patch("/:pokemonCardId", authenticateToken, updatePokemonCard)
pokemonCardRouter.delete("/:pokemonCardId", authenticateToken, deletePokemonCard)

export default pokemonCardRouter