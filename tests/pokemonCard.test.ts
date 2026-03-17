import request from "supertest"
import { app } from "../src"
import { prismaMock } from "./jest.setup"

describe("PokemonCard API", () => {

  describe("GET /pokemons-cards", () => {

    it("should fetch all PokemonCards", async () => {

      const mockPokemonCards = [
        { id: 1, name: "Pikachu" },
        { id: 2, name: "Charizard" }
      ]

      prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards as any)

      const response = await request(app).get("/pokemons-cards")

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockPokemonCards)

    })
  })


  describe("GET /pokemons-cards/:pokemonCardId", () => {

    it("should fetch a PokemonCard by ID", async () => {

      const mockPokemonCard = {
        id: 1,
        name: "Pikachu"
      }

      prismaMock.pokemonCard.findUnique.mockResolvedValue(mockPokemonCard as any)

      const response = await request(app)
        .get("/pokemons-cards/1")

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockPokemonCard)

    })


    it("should return 404 if PokemonCard is not found", async () => {

      prismaMock.pokemonCard.findUnique.mockResolvedValue(null)

      const response = await request(app)
        .get("/pokemons-cards/999")

      expect(response.status).toBe(404)

    })

  })


  describe("POST /pokemons-cards", () => {

    it("should create a new PokemonCard", async () => {

      const createdPokemonCard = {
        id: 1,
        name: "Pikachu"
      }

      prismaMock.pokemonCard.create.mockResolvedValue(createdPokemonCard as any)

      const response = await request(app)
        .post("/pokemons-cards")
        .set("Authorization", "Bearer mockedToken")
        .send({
          name: "Pikachu"
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual(createdPokemonCard)

    })

  })


  describe("PATCH /pokemons-cards/:pokemonCardId", () => {

    it("should update an existing PokemonCard", async () => {

      const updatedPokemonCard = {
        id: 1,
        name: "Raichu"
      }

      prismaMock.pokemonCard.update.mockResolvedValue(updatedPokemonCard as any)

      const response = await request(app)
        .patch("/pokemons-cards/1")
        .set("Authorization", "Bearer mockedToken")
        .send({
          name: "Raichu"
        })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(updatedPokemonCard)

    })

  })


  describe("DELETE /pokemons-cards/:pokemonCardId", () => {

    it("should delete a PokemonCard", async () => {

      prismaMock.pokemonCard.delete.mockResolvedValue({} as any)

      const response = await request(app)
        .delete("/pokemons-cards/1")
        .set("Authorization", "Bearer mockedToken")

      expect(response.status).toBe(204)

    })

  })

})