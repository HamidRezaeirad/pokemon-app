import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BattlesModule } from './battles/battles.module';
import { EnvVariables } from './config/env.variables';
import { PokemonsModule } from './pokemons/pokemons.module';
import { PokemonSeedService } from './pokemons/pokemons.seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvVariables],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => ({
        uri: `mongodb://${configService.get('MONGO_USER')}:${configService.get('MONGO_PASS')}@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get('MONGO_DB')}?authSource=${configService.get('MONGO_AUTH_DB')}`,
      }),
    }),
    BattlesModule,
    PokemonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// The AppModule is the root module of the application.
export class AppModule implements OnModuleInit {
  constructor(private readonly pokemonSeedService: PokemonSeedService) {}
  async onModuleInit() {
    await this.pokemonSeedService.bootstrapSeed();
  }
}
