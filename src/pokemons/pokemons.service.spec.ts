import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonRepository } from './pokemon.repository';
import { PokemonsService } from './pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let repository: PokemonRepository;

  const mockPokemonRepository = {
    findByNames: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonsService,
        { provide: PokemonRepository, useValue: mockPokemonRepository },
      ],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
    repository = module.get<PokemonRepository>(PokemonRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemonsByNames', () => {
    it('should return an array of Pokémon objects when all names are found', async () => {
      const mockNames = ['pikachu', 'bulbasaur'];
      const mockPokemons = [
        { id: 1, name: 'pikachu' },
        { id: 2, name: 'bulbasaur' },
      ];

      mockPokemonRepository.findByNames.mockResolvedValue(mockPokemons);

      const result = await service.getPokemonsByNames(mockNames);

      expect(result).toEqual(mockPokemons);
      expect(mockPokemonRepository.findByNames).toHaveBeenCalledWith(mockNames);
    });

    it('should throw NotFoundException if not all names are found', async () => {
      const mockNames = ['pikachu', 'unknown'];
      const mockPokemons = [{ id: 1, name: 'pikachu' }];

      mockPokemonRepository.findByNames.mockResolvedValue(mockPokemons);

      await expect(service.getPokemonsByNames(mockNames)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPokemonRepository.findByNames).toHaveBeenCalledWith(mockNames);
    });

    it('should throw NotFoundException if no Pokémon are found', async () => {
      const mockNames = ['unknown'];
      const mockPokemons = [];

      mockPokemonRepository.findByNames.mockResolvedValue(mockPokemons);

      await expect(service.getPokemonsByNames(mockNames)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPokemonRepository.findByNames).toHaveBeenCalledWith(mockNames);
    });

    it('should log an error and throw NotFoundException if an error occurs in the repository', async () => {
      const mockNames = ['pikachu'];
      const mockError = new Error('Database error');

      mockPokemonRepository.findByNames.mockRejectedValue(mockError);

      const loggerSpy = jest.spyOn(service.logger, 'error');

      await expect(service.getPokemonsByNames(mockNames)).rejects.toThrow(
        NotFoundException,
      );
      expect(loggerSpy).toHaveBeenCalledWith(
        'Error fetching Pokémon data:',
        mockError,
      );
      expect(mockPokemonRepository.findByNames).toHaveBeenCalledWith(mockNames);
    });
  });
});
