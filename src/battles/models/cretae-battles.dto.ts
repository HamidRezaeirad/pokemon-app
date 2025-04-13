import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

/**
 * Data Transfer Object (DTO) for representing battle configurations between two teams of Pokémon.
 * This class is used to validate and document the structure of the data required for a battle.
 */
export class CreateBattlesDto {
  /**
   * Array of Pokémon names representing team A.
   *
   * - Must be an array of strings.
   * - Cannot be empty.
   * - Each element in the array must be a string.
   *
   * @example ['Pikachu', 'Charmander']
   */
  @ApiProperty({
    description: 'Array of Pokémon names for team A',
    type: 'array',
    items: {
      type: 'string',
    },
    example: ['Pikachu', 'Charmander'],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  teamA: string[];

  /**
   * Array of Pokémon names representing team B.
   *
   * - Must be an array of strings.
   * - Cannot be empty.
   * - Each element in the array must be a string.
   *
   * @example ['Bulbasaur', 'Squirtle']
   */
  @ApiProperty({
    description: 'Array of Pokémon names for team B',
    type: 'array',
    items: {
      type: 'string',
    },
    example: ['Bulbasaur', 'Squirtle'],
    required: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  teamB: string[];
}
