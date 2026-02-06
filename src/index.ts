import express from 'express';
import { pokemonCardRouter } from './pokemonCards/pokemonCard.routes'
export const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/pokemons-cards', pokemonCardRouter)

export const server = app.listen(port);

export function stopServer() {
  server.close();
}
