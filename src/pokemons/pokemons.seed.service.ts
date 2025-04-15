import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { getLogger } from '../common/logger/logger';
import { PokemonRepository } from './pokemon.repository';

// The PokemonSeedService is responsible for seeding the Pokémon data into the database.
// It checks if the Pokémon data already exists, and if not, it fetches the data from a specified URL and inserts it into the database.
// This service is typically used during the application startup to ensure that the database is populated with initial data.
@Injectable()
export class PokemonSeedService {
  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly configService: ConfigService,
  ) {}

  logger = getLogger();

  /**
   * Seeds the Pokémon data into the database.
   * This method checks if Pokémon data already exists in the database.
   * If not, it fetches the data from a specified URL and inserts it into the database.
   **/
  async bootstrapSeed() {
    const count = await this.pokemonRepository.getDucomentCount();

    if (count > 0) {
      this.logger.log('Seed skipped: Pokémon already exists.');
      return;
    }

    try {
      const data = await this.fetchPokemonData();

      if (!data || !data.pokemon) {
        throw new Error('Invalid data format');
      }
      if (data.pokemon.length === 0) {
        throw new Error('No Pokémon data found');
      }

      await this.pokemonRepository.insertMany(data.pokemon);
      this.logger.log('Pokémon seed complete.');
    } catch (error) {
      this.logger.error('Error seeding Pokémon data:', error);
      throw error;
    }
  }

  /**
   * Fetches Pokémon data from a specified URL.
   * This method uses the axios library to make an HTTP GET request to the URL defined in the environment variables.
   * @returns The fetched Pokémon data.
   * @throws An error if the URL is not set or if the request fails.
   */
  async fetchPokemonData(): Promise<any> {
    const url = this.configService.get('POKEMON_DATA_URL');

    if (!url) {
      throw new Error("Environment variable 'POKEMON_DATA_URL' is not set.");
    }

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch Pokémon data:', error);
      throw error; // Re-throw the error after logging
    }
  }
}
