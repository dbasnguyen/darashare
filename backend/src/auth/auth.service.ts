import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // ============================================================
  // 📝 REGISTER — Création d’un nouvel utilisateur
  // ============================================================
  async register(email: string, password: string) {
    // Vérifier si l’email existe déjà
    const existing = await this.usersRepo.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    // Hash du mot de passe
    const hash = await bcrypt.hash(password, 10);

    // Création de l’utilisateur
    const user = this.usersRepo.create({ email, password: hash });
    await this.usersRepo.save(user);

    // On ne retourne jamais le mot de passe
    return { id: user.id, email: user.email };
  }

  // ============================================================
  // 🔍 VALIDATION — Vérification des identifiants utilisateur
  // ============================================================
  async validateUser(email: string, password: string): Promise<User> {
    // Recherche de l’utilisateur
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérification du mot de passe
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // ============================================================
  // 🔐 LOGIN — Génération du token JWT
  // ============================================================
  async login(email: string, password: string) {
    // Vérification des identifiants
    const user = await this.validateUser(email, password);

    // Payload du JWT
    const payload = { sub: user.id, email: user.email };

    // Génération du token
    const token = await this.jwtService.signAsync(payload);

    return { token };

  }
}
