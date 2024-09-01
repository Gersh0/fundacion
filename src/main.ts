import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unwanted fields
      forbidNonWhitelisted: true, // throw an error if unwanted fields are present
      // transform: true, // transform payload to DTO
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );
  const port = process.env.PORT || 3131;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
