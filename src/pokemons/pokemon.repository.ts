// src/pokemon/repositories/pokemon.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from './schemas/pokemon.schema';

/**
 * Repository class for managing Pokémon data.
 * This class provides methods to interact with the Pokémon database.
 */
@Injectable()
export class PokemonRepository {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  /**
   * Retrieves a Pokémon by its Names.
   * @param names - An array of the Pokémon's name to retrieve.
   * @returns The Pokémon document if found, or null if not found.
   */

  // It might be change it to findById in real project
  async findByNames(names: string[]): Promise<Pokemon[] | null> {
    return this.pokemonModel.find({ name: { $in: names } }).exec();
  }

  /**
   * Retrieves a Pokémon Ducoment Count.
   * @returns The Pokémon document if found, or null if not found.
   */
  async getDucomentCount(): Promise<number | null> {
    return await this.pokemonModel.countDocuments();
  }

  /**
   * Insert array of Pokémon.
   * @param pokemons - The array of the Pokémon to insert.
   * @returns The array of Pokémon document if found, or null if not found.
   */
  async insertMany(pokemons: Pokemon[]): Promise<Pokemon[] | null> {
    return this.pokemonModel.insertMany(pokemons);
  }
}
