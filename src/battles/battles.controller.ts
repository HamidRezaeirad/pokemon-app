import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BattlesService } from './battles.service';
import { BattlesDto } from './models/battles.dto';
import { CreateBattlesDto } from './models/cretae-battles.dto';

/**
 * Controller responsible for handling battle-related operations.
 * Provides endpoints for simulating battles between entities.
 */
/**
 * Controller for handling battle-related operations.
 */
@Controller('battles')
export class BattlesController {
  /**
   * Initializes the BattlesController with the required service.
   * @param battleService - The service responsible for battle simulation logic.
   */
  constructor(private readonly battleService: BattlesService) {}

  /**
   * Simulates a battle based on the provided battle data.
   *
   * @param CreateBattlesDto - The data transfer object containing the details of the battle to simulate.
   * @returns The result of the simulated battle as a `BattlesDto`.
   */
  @ApiResponse({ status: 201, type: BattlesDto })
  @Post()
  async simulateBattle(
    @Body() createBattlesDto: CreateBattlesDto,
  ): Promise<BattlesDto> {
    return await this.battleService.simulate(createBattlesDto);
  }
}
