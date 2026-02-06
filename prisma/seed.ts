import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.pokemonCard.deleteMany();
  
  await prisma.type.deleteMany();

  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: "admin"
    }
  })

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
    data: {
      name: 'Bulbizarre',
      pokedexId: 1,
      lifePoints: 45,
      size: 0.7,
      weight: 6.9,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
      type: {
        connect: { name: 'Grass' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Salamèche',
      pokedexId: 4,
      lifePoints: 39,
      size: 0.6,
      weight: 8.5,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
      type: {
        connect: { name: 'Fire' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Carapuce',
      pokedexId: 7,
      lifePoints: 44,
      size: 0.5,
      weight: 9.0,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
      type: {
        connect: { name: 'Water' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Pikachu',
      pokedexId: 25,
      lifePoints: 35,
      size: 0.4,
      weight: 6.0,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      type: {
        connect: { name: 'Electric' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Evoli',
      pokedexId: 133,
      lifePoints: 55,
      size: 0.3,
      weight: 6.5,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png',
      type: {
        connect: { name: 'Normal' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Roucool',
      pokedexId: 16,
      lifePoints: 40,
      size: 0.3,
      weight: 1.8,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png',
      type: {
        connect: { name: 'Flying' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Rattata',
      pokedexId: 19,
      lifePoints: 30,
      size: 0.3,
      weight: 3.5,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png',
      type: {
        connect: { name: 'Normal' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Sabelette',
      pokedexId: 27,
      lifePoints: 35,
      size: 0.5,
      weight: 6.0,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/027.png',
      type: {
        connect: { name: 'Ground' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Abra',
      pokedexId: 63,
      lifePoints: 25,
      size: 0.9,
      weight: 19.5,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png',
      type: {
        connect: { name: 'Psychic' }
      }
    }
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Machoc',
      pokedexId: 66,
      lifePoints: 70,
      size: 0.8,
      weight: 19.5,
      imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png',
      type: {
        connect: { name: 'Fighting' }
      }
    }
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
