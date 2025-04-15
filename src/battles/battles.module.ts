import { Module } from '@nestjs/common';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { BattlesController } from './battles.controller';
import { BattlesService } from './battles.service';

@Module({
  imports: [PokemonsModule],
  providers: [BattlesService],
  controllers: [BattlesController],
})
export class BattlesModule {}
