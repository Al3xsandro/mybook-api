import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infra/http/app.modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(3000);
}
bootstrap();
