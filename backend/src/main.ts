import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Désactiver les ETags
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('etag', false);

  // Désactiver le cache global
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });

  // 🔥 CORS + exposition du header Content-Disposition
  app.enableCors({
    origin: '*',
    exposedHeaders: ['Content-Disposition'], // <── LA LIGNE QUI RÉSOLVE TON BUG
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();
