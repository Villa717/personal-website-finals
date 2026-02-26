import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Requirement: Enable CORS for all methods including DELETE
  app.enableCors({
    origin: true, // Dynamically allows your frontend Vercel URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}

// CRITICAL: This line actually starts the server
bootstrap();
