import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonRepository } from './pokemon.repository';
import { PokemonSeedService } from './pokemons.seed.service';
import { PokemonsService } from './pokemons.service';
import { Pokemon, PokemonSchema } from './schemas/pokemon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ],
  providers: [PokemonRepository, PokemonsService, PokemonSeedService],
  exports: [PokemonsService, PokemonSeedService],
})
export class PokemonsModule {}
