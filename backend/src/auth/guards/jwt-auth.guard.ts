import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // ============================================================
  // 🛡️ JWT AUTH GUARD
  // ------------------------------------------------------------
  // Ce guard protège les routes en exigeant un token JWT valide.
  // Il s'appuie sur la stratégie 'jwt' définie dans JwtStrategy.
  //
  // Si le token est valide :
  //   → req.user est automatiquement rempli
  //   → la route protégée peut s'exécuter
  //
  // Si le token est invalide ou absent :
  //   → Nest renvoie automatiquement une erreur 401
  // ============================================================
}
