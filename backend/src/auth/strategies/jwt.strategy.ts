import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    super({
      // ============================================================
      // 🔐 EXTRACTION DU TOKEN
      // Récupère le JWT dans l’en-tête Authorization: Bearer <token>
      // ============================================================
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // ============================================================
      // 🔑 CLÉ SECRÈTE
      // Utilisée pour vérifier la signature du token
      // ============================================================
      secretOrKey: process.env.JWT_SECRET || 'dev-secret',
    });
  }

  // ============================================================
  // 🧩 VALIDATION DU TOKEN
  // Cette méthode est appelée automatiquement si le token est valide.
  // Elle injecte les infos du payload dans req.user
  // ============================================================
  async validate(payload: any) {
    // On retourne les infos utiles pour l’application
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
