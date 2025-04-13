import { Module } from '@nestjs/common';
import { PokemonsModule } from 'src/pokemons/pokemons.module';
import { BattlesController } from './battles.controller';
import { BattlesService } from './battles.service';

@Module({
  imports: [PokemonsModule],
  providers: [BattlesService],
  controllers: [BattlesController],
})
export class BattlesModule {}
