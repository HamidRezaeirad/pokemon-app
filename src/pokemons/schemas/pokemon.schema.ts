// src/pokemon/schemas/pokemon.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  @Prop() id: number;
  @Prop() num: string;
  @Prop({ index: true }) name: string;
  @Prop() img: string;
  @Prop([String]) type: string[];
  @Prop() height: string;
  @Prop() weight: string;
  @Prop() candy: string;
  @Prop() candy_count: number;
  @Prop() egg: string;
  @Prop() spawn_chance: number;
  @Prop() avg_spawns: number;
  @Prop() spawn_time: string;
  @Prop([Number]) multipliers: number[];
  @Prop() next_evolution: { num: string; name: string }[];
  @Prop([String]) weaknesses: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
