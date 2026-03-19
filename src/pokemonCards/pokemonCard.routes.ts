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

/**
 * @swagger
 * /pokemons-cards:
 *   get:
 *     summary: Récupère tous les Pokémon
 *     responses:
 *       200:
 *         description: Liste des Pokémon
 */
pokemonCardRouter.get("/", getAllPokemonCards)

/**
 * @swagger
 * /pokemons-cards/{pokemonCardId}:
 *   get:
 *     summary: Récupère un Pokémon par ID
 *     parameters:
 *       - in: path
 *         name: pokemonCardId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pokémon trouvé
 *       404:
 *         description: Pokémon non trouvé
 */
pokemonCardRouter.get("/:pokemonCardId", getPokemonCardById)

/**
 * @swagger
 * /pokemons-cards:
 *   post:
 *     summary: Crée un Pokémon
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - pokedexId
 *               - type
 *               - lifePoints
 *             properties:
 *               name:
 *                 type: string
 *               pokedexId:
 *                 type: integer
 *               type:
 *                 type: integer
 *               lifePoints:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pokémon créé
 *       400:
 *         description: Erreur
 */
pokemonCardRouter.post("/", createPokemonCard)

/**
 * @swagger
 * /pokemons-cards/{pokemonCardId}:
 *   patch:
 *     summary: Modifie un Pokémon
 *     security:
 *       - bearerAuth: []
 */
pokemonCardRouter.patch("/:pokemonCardId", updatePokemonCard)

/**
 * @swagger
 * /pokemons-cards/{pokemonCardId}:
 *   delete:
 *     summary: Supprime un Pokémon
 *     security:
 *       - bearerAuth: []
 */
pokemonCardRouter.delete("/:pokemonCardId", deletePokemonCard)

pokemonCardRouter.post("/", authenticateToken, createPokemonCard)
pokemonCardRouter.patch("/:pokemonCardId", authenticateToken, updatePokemonCard)
pokemonCardRouter.delete("/:pokemonCardId", authenticateToken, deletePokemonCard)

export default pokemonCardRouter