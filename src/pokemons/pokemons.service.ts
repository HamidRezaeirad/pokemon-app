import { Injectable, NotFoundException } from '@nestjs/common';
import { getLogger } from '../common/logger/logger';
import { PokemonRepository } from './pokemon.repository';
import { Pokemon } from './schemas/pokemon.schema';

// PokemonsService is responsible for retrieving Pokémon data
@Injectable()
export class PokemonsService {
  /**
   * Initializes the PokemonsService with the required repository.
   * @param pokemonRepo - The repository responsible for Pokémon data retrieval.
   */
  constructor(private readonly pokemonRepo: PokemonRepository) {}

  // Logger instance for logging errors and information
  logger = getLogger();

  /**
   * Retrieves a list of Pokémon objects based on the provided names.
   *
   * @param names - An array of strings representing Pokémon names.
   * The search is case-insensitive for names and allows numeric IDs.
   * @returns An array of Pokémon objects that match the provided names.
   * @throws NotFoundException - If no Pokémon are found matching the provided names.
   */
  async getPokemonsByNames(names: string[]): Promise<Pokemon[]> {
    try {
      const pokemons = await this.pokemonRepo.findByNames(names);

      const sortedPokemons = names
        .map((name) => pokemons.find((p) => p.name === name))
        .filter(Boolean);

      if (!sortedPokemons || sortedPokemons.length !== names.length) {
        throw new NotFoundException(
          `Pokémon not found! Please check the Pokémon name or ID.`,
        );
      }

      return sortedPokemons;
    } catch (error) {
      this.logger.error('Error fetching Pokémon data:', error);

      throw new NotFoundException(
        `Pokémon not found! Please check the Pokémon name or ID.`,
      );
    }
  }
}
