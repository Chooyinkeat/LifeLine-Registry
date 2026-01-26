import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow frontend to call backend
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // reject extra fields
      transform: true, // auto-transform DTOs
    }),
  );
  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
