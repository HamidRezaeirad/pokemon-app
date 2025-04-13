import { ApiProperty } from '@nestjs/swagger';

export class BattlesDto {
  /**
   * The result of the battle, indicating which team won.
   *
   * @example 'Team A wins the battle!'
   */
  @ApiProperty({
    description: 'The result of the battle',
    type: 'string',
    example: 'Team A wins the battle!',
  })
  result: string;

  /**
   * The score of team A.
   *
   * @example 3
   */
  @ApiProperty({
    description: 'The score of team A',
    type: 'number',
    example: 3,
  })
  teamAScore: number;

  /**
   * The score of team B.
   *
   * @example 2
   */
  @ApiProperty({
    description: 'The score of team B',
    type: 'number',
    example: 2,
  })
  teamBScore: number;

  /**
   * The log of battle events.
   *
   * @example ['Battle 1: Pikachu vs Charizard -> Pikachu wins']
   */
  @ApiProperty({
    description: 'The log of battle events',
    type: 'array',
    items: {
      type: 'string',
    },
    example: [
      'Battle 1: Pikachu score is 3.556 vs Charizard score is 2.556 -> Pikachu wins',
    ],
  })
  log: string[];

  /**
   * The team that won the battle.
   *
   * @example 'Team A'
   */
  @ApiProperty({
    description: 'The team that won the battle',
    type: 'string',
    example: 'Team A',
  })
  winnerTeam: string;
}
