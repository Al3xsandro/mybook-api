import { NestFactory } from '@nestjs/core';
import { App } from './shared/infra/http/app.modules';

async function bootstrap() {
  const app = await NestFactory.create(App);
  await app.listen(3000);
}
bootstrap();
