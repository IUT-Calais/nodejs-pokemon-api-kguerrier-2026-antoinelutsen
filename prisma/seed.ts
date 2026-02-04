import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.pokemonCard.delete();
  await prisma.type.deleteMany();
  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
      { name: 'Steel' },
      { name: 'Fairy' },
    ],
  });

  await prisma.pokemonCard.create({
    data: [
      {
        name: 'Bulbizarre',
        pokedexId: 1,
        lifePoints: 45,
        size: 0.7,
        weight: 6.9,
        imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
        type: {
          connect: { name: 'Grass' }
        }
      },

      {
        name: 'Salamèche',
        pokedexId: 4,
        lifePoints: 39,
        size: 0.6,
        weight: 8.5,
        imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        typeId: 2, // Fire
      },
      {
        name: 'Carapuce',
        pokedexId: 7,
        lifePoints: 44,
        size: 0.5,
        weight: 9.0,
        imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        typeId: 3, // Water
      },
      {
        name: 'Pikachu',
        pokedexId: 25,
        lifePoints: 35,
        size: 0.4,
        weight: 6.0,
        imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        typeId: 5, // Electric
      },
      {
        name: 'Evoli',
        pokedexId: 133,
        lifePoints: 55,
        size: 0.3,
        weight: 6.5,
        imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
        typeId: 1, // Normal
      }
    ],
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
