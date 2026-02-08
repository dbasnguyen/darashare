import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
// import { UsersController } from './users.controller'; // Désactivé

@Module({
  // ============================================================
  // 📦 IMPORTS — Accès à l’entité User via TypeORM
  // ============================================================
  imports: [TypeOrmModule.forFeature([User])],

  // ============================================================
  // 🧩 PROVIDERS — Services disponibles dans le module
  // ============================================================
  providers: [UsersService],

  // ============================================================
  // 🎮 CONTROLLERS — Désactivé pour éviter les doublons avec /auth
  // ------------------------------------------------------------
  // L’inscription se fait via AuthController.register()
  // ============================================================
  controllers: [],

  // ============================================================
  // 🔁 EXPORTS — Permet à AuthService d’utiliser UsersService
  // ============================================================
  exports: [UsersService],
})
export class UsersModule {}
