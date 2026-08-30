import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: false }),
  );

  const origins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim());
  app.enableCors({ origin: origins, credentials: true });

  await app.listen(process.env.PORT || 4000);
  // eslint-disable-next-line no-console
  console.log(`Clé Beauty API on http://localhost:${process.env.PORT || 4000}/api`);
}
bootstrap();
