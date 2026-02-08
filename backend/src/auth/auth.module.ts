import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  // ============================================================
  // 📦 IMPORTS — Modules nécessaires pour l’authentification
  // ============================================================
  imports: [
    // Accès à l’entité User via TypeORM
    TypeOrmModule.forFeature([User]),

    // Activation de Passport (nécessaire pour JWT)
    PassportModule,

    // Configuration du module JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret', // clé de signature
      signOptions: { expiresIn: '1h' },               // durée de validité du token
    }),
  ],

  // ============================================================
  // 🧩 PROVIDERS — Services et stratégies disponibles
  // ============================================================
  providers: [
    AuthService,  // logique métier d’authentification
    JwtStrategy,  // stratégie JWT pour valider les tokens
  ],

  // ============================================================
  // 🎮 CONTROLLERS — Points d’entrée de l’API
  // ============================================================
  controllers: [AuthController],

  // ============================================================
  // 🔁 EXPORTS — Services accessibles aux autres modules
  // ============================================================
  exports: [AuthService],
})
export class AuthModule {}
