import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { getLogger } from './common/logger/logger';

/**
 * The main entry point of the NestJS application.
 * It initializes the application, sets up global filters, validation pipes,
 * and Swagger documentation.
 *
 * @returns {Promise<void>} A promise that resolves when the application is successfully bootstrapped.
 */
async function bootstrap() {
  const logger = getLogger();
  const app = await NestFactory.create(AppModule);

  // Set up global filters for handling exceptions
  app.useGlobalFilters(new AllExceptionsFilter()); // Catch all exceptions
  // Handle HTTP exceptions specifically
  app.useGlobalFilters(new HttpExceptionFilter()); // Handle HTTP exceptions

  app.enableCors(); // Enable Cross-Origin Resource Sharing (CORS)
  app.setGlobalPrefix('api'); // Set a global prefix for all routes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // auto transform types (e.g. from JSON)
      whitelist: true, // strips unknown props
      forbidNonWhitelisted: true, // throws error on unknown props
    }),
  );

  const configService = app.get(ConfigService);

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Pokemon APP')
    .setDescription('Pokemon App API description')
    .setVersion('1.0')
    .addTag('Pokemon API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get('APP_PORT', 3000);
  const env = configService.get('NODE_ENV', 'development');
  await app.listen(port, () =>
    logger.log(
      `Application is running in ${env} mode on: http://localhost:${port}/api mongo `,
    ),
  );
}
bootstrap();
