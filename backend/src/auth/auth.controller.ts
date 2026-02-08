import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ============================================================
  // 📝 REGISTER — Création d’un nouvel utilisateur
  // ============================================================
  @Post('register')
  register(@Body() dto: RegisterDto) {
    // Appel au service d’authentification pour créer un utilisateur
    return this.authService.register(dto.email, dto.password);
  }

  // ============================================================
  // 🔐 LOGIN — Authentification et génération du JWT
  // ============================================================
  @Post('login')
  login(@Body() dto: LoginDto) {
    // Retourne un token JWT si les identifiants sont valides
    return this.authService.login(dto.email, dto.password);
  }
}
