import { Router } from "express"
import {
  getAllPokemonCards,
  getPokemonCardById,
  createPokemonCard,
  updatePokemonCard,
  deletePokemonCard
} from "../controllers/pokemonCard.controller.js"

const router = Router()

router.get("/pokemons-cards", getAllPokemonCards)
router.get("/pokemons-cards/:pokemonCardId", getPokemonCardById)
router.post("/pokemon-cards", createPokemonCard)
router.patch("/pokemon-cards/:pokemonCardId", updatePokemonCard)
router.delete("/pokemon-cards/:pokemonCardId", deletePokemonCard)

export default router
