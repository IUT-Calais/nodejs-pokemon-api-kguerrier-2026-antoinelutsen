import express from 'express';
import pokemonCardRouter from './pokemonCards/pokemonCard.routes'
import userRouter from "./users/user.routes.js"

export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/pokemons-cards', pokemonCardRouter)
app.use("/users", userRouter)

export const server = app.listen(port);

export function stopServer() {
  server.close();
}

console.log("pokemonCardRouter:", pokemonCardRouter)
console.log("userRouter:", userRouter)
