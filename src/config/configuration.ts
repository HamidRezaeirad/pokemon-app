import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class configuration {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  APP_PORT: number;

  @IsString()
  @Transform(({ value }) => value || 'development')
  NODE_ENV;

  @IsUrl()
  POKEMON_DATA_URL: string;

  @IsString()
  MONGO_USER: string;

  @IsString()
  MONGO_PASS: string;

  @IsString()
  MONGO_HOST: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  MONGO_PORT: number;

  @IsString()
  MONGO_DB: string;

  @IsString()
  MONGO_AUTH_DB: string;
}
