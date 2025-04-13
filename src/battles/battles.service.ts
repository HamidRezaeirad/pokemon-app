import { BadRequestException, Injectable } from '@nestjs/common';
import { Pokemon } from 'src/pokemons/schemas/pokemon.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
import { BattlesDto } from './models/battles.dto';
import { CreateBattlesDto } from './models/cretae-battles.dto';

interface BattleResult {
  winner: Pokemon;
  winnerTeam: string;
  scoreA: number;
  scoreB: number;
}

/**
 * Service responsible for simulating Pokémon battles between two teams.
 */
@Injectable()
export class BattlesService {
  /**
   * Initializes the BattlesService with the required Pokémon service.
   * Constructor for the BattlesService class.
   *
   * @param pokemonsService - The service responsible for Pokémon data retrieval.
   */
  constructor(private readonly pokemonsService: PokemonsService) {}

  /**
   * Simulates a battle between two teams of Pokémon.
   *
   * @param CreateBattlesDto - The data transfer object containing the two teams of Pokémon.
   * @returns BattlesDto - An object containing the result of the battle, scores, the winning team, and a battle log.
   * @throws {BadRequestException} If the teams share any Pokémon or if the teams do not have an equal number of Pokémon.
   */
  async simulate(createBattlesDto: CreateBattlesDto): Promise<BattlesDto> {
    const { teamA: inputTeamA, teamB: inputTeamB } = createBattlesDto;

    // Validate that both teams to not share Pokémons.
    if (inputTeamA.filter((name) => new Set(inputTeamB).has(name)).length > 0) {
      throw new BadRequestException('Teams must not share any Pokémon.');
    }

    // Retrieve Pokémon data for both teams using the PokemonsService
    const teamA = await this.pokemonsService.getPokemonsByNames(inputTeamA);
    const teamB = await this.pokemonsService.getPokemonsByNames(inputTeamB);

    // Validate that both teams have the same number of Pokémon
    if (teamA.length !== teamB.length) {
      throw new BadRequestException('Teams must have equal number of Pokémon.');
    }

    const log: string[] = [];
    let teamAScore = 0;
    let teamBScore = 0;

    log.push('Battle log:');
    let battleNumber = 1;
    while (teamA.length > 0 && teamB.length > 0) {
      // Iterate through the Pokémon in both teams and simulate battles
      for (let i = 0; i < Math.min(teamA.length, teamB.length); i++) {
        const pokémonA = teamA[i];
        const pokémonB = teamB[i];

        const result = this.battleLogic(pokémonA, pokémonB);
        const { scoreA, scoreB } = result;
        log.push(
          `Battle ${battleNumber++}: ${pokémonA.name} score is ${scoreA.toFixed(3)} vs ${pokémonB.name} score is ${scoreB.toFixed(3)}  -> ${result.winner.name} wins`,
        );

        result.winnerTeam === 'A' ? teamAScore++ : teamBScore++;

        if (result.winnerTeam === 'A') {
          teamB.splice(i, 1); // Remove the defeated Pokémon from Team B
        }
        if (result.winnerTeam === 'B') {
          teamA.splice(i, 1); // Remove the defeated Pokémon from Team A
        }
      }
    }

    const winningTeam = teamAScore > teamBScore ? 'Team A' : 'Team B';

    return {
      result: `${winningTeam} wins the battle!`,
      teamAScore,
      teamBScore,
      winnerTeam: winningTeam,
      log,
    };
  }

  /**
   * Determines the winner of a battle between two Pokémon based on their attributes (weight,height, and multipliers).
   *
   * @param pokemonA - The first Pokémon participating in the battle.
   * @param pokemonB - The second Pokémon participating in the battle.
   * @returns An object containing the winning Pokémon and the team it belongs to.
   */
  battleLogic(pokemonA: Pokemon, pokemonB: Pokemon): BattleResult {
    const scoreA =
      (pokemonA.multipliers
        ? pokemonA.multipliers.reduce((acc, multiplier) => acc + multiplier, 1)
        : 0) +
      parseFloat(pokemonA.weight) * 0.5 +
      parseFloat(pokemonA.height) * 0.3;

    const scoreB =
      (pokemonB.multipliers
        ? pokemonB.multipliers.reduce((acc, multiplier) => acc + multiplier, 1)
        : 0) +
      parseFloat(pokemonB.weight) * 0.5 +
      parseFloat(pokemonB.height) * 0.3;

    const winner: Pokemon = scoreA > scoreB ? pokemonA : pokemonB;
    return { winner, winnerTeam: scoreA > scoreB ? 'A' : 'B', scoreA, scoreB };
  }
}
