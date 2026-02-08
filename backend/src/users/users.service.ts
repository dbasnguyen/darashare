import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // ============================================================
  // 📝 CRÉATION D’UN UTILISATEUR
  // ------------------------------------------------------------
  // ⚠️ Note : Cette méthode fait doublon avec AuthService.register().
  // Elle peut être utilisée pour un panneau admin ou des tests.
  // ============================================================
  async create(email: string, password: string): Promise<User> {
    // Vérifier si l’email existe déjà
    const existing = await this.usersRepo.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Création de l’utilisateur
    const user = this.usersRepo.create({
      email,
      password: hashed,
    });

    // Sauvegarde en base
    return this.usersRepo.save(user);
  }

  // ============================================================
  // 🔍 RECHERCHE PAR EMAIL
  // ------------------------------------------------------------
  // Utilisé par AuthService pour valider un login
  // ============================================================
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }
}
