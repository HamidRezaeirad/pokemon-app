import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Pokemon } from 'src/pokemons/schemas/pokemon.schema';
import { PokemonsService } from '../pokemons/pokemons.service';
import { BattlesService } from './battles.service';

describe('BattlesService', () => {
  let battlesService: BattlesService;
  let pokemonsService: PokemonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BattlesService,
        {
          provide: PokemonsService,
          useValue: {
            getPokemonsByNames: jest.fn(),
          },
        },
      ],
    }).compile();

    battlesService = module.get<BattlesService>(BattlesService);
    pokemonsService = module.get<PokemonsService>(PokemonsService);
  });

  it('should throw BadRequestException if teams share any Pokémon', async () => {
    const battlesDto = {
      teamA: ['Pikachu', 'Charmander'],
      teamB: ['Charmander', 'Bulbasaur'],
    };

    await expect(battlesService.simulate(battlesDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException if teams do not have equal number of Pokémon', async () => {
    const battlesDto = {
      teamA: ['Pikachu', 'Charmander'],
      teamB: ['Bulbasaur'],
    };

    jest
      .spyOn(pokemonsService, 'getPokemonsByNames')
      .mockResolvedValueOnce([pikachuPokemon, charmanderPokemon])
      .mockResolvedValueOnce([bulbasaurPokemon]);

    await expect(battlesService.simulate(battlesDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return the correct battle result', async () => {
    const battlesDto = {
      teamA: ['Pikachu', 'Charmander'],
      teamB: ['Bulbasaur', 'Squirtle'],
    };

    jest
      .spyOn(pokemonsService, 'getPokemonsByNames')
      .mockResolvedValueOnce([pikachuPokemon, charmanderPokemon]);

    jest
      .spyOn(pokemonsService, 'getPokemonsByNames')
      .mockResolvedValueOnce([bulbasaurPokemon, squirtlePokemon]);

    const result = await battlesService.simulate(battlesDto);

    expect(result).toEqual({
      result: 'Team B wins the battle!',
      teamAScore: 1,
      teamBScore: 2,
      winnerTeam: 'Team B',
      log: [
        'Battle log:',
        'Battle 1: Pikachu score is 6.463 vs Bulbasaur score is 6.243  -> Pikachu wins',
        'Battle 2: Pikachu score is 6.463 vs Squirtle score is 7.753  -> Squirtle wins',
        'Battle 3: Charmander score is 7.083 vs Squirtle score is 7.753  -> Squirtle wins',
      ],
    });
  });

  it('should correctly determine the winner in battleLogic', () => {
    const result = battlesService.battleLogic(pikachuPokemon, bulbasaurPokemon);

    expect(result).toEqual({
      winner: pikachuPokemon,
      winnerTeam: 'A',
      scoreA: 6.463,
      scoreB: 6.243,
    });
  });
});

const pikachuPokemon: Pokemon = {
  name: 'Pikachu',
  height: '0.41 m',
  weight: '6.0 kg',
  multipliers: [2.34],
  id: 0,
  num: '',
  img: '',
  type: [],
  candy: '',
  candy_count: 0,
  egg: '',
  spawn_chance: 0,
  avg_spawns: 0,
  spawn_time: '',
  next_evolution: [],
  weaknesses: [],
};
const bulbasaurPokemon: Pokemon = {
  name: 'Bulbasaur',
  height: '0.71 m',
  weight: '6.9 kg',
  multipliers: [1.58],
  id: 0,
  num: '',
  img: '',
  type: [],
  candy: '',
  candy_count: 0,
  egg: '',
  spawn_chance: 0,
  avg_spawns: 0,
  spawn_time: '',
  next_evolution: [],
  weaknesses: [],
};

const squirtlePokemon: Pokemon = {
  name: 'Squirtle',
  height: '0.51 m',
  weight: '9.0 kg',
  multipliers: [2.1],
  id: 0,
  num: '',
  img: '',
  type: [],
  candy: '',
  candy_count: 0,
  egg: '',
  spawn_chance: 0,
  avg_spawns: 0,
  spawn_time: '',
  next_evolution: [],
  weaknesses: [],
};

const charmanderPokemon: Pokemon = {
  name: 'Charmander',
  height: '0.61 m',
  weight: '8.5 kg',
  multipliers: [1.65],
  id: 0,
  num: '',
  img: '',
  type: [],
  candy: '',
  candy_count: 0,
  egg: '',
  spawn_chance: 0,
  avg_spawns: 0,
  spawn_time: '',
  next_evolution: [],
  weaknesses: [],
};
