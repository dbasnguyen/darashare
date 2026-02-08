import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// ⭐ Import correct : la seule entité File valide
import { FileEntity } from '../entities/file.entity';

@Entity('users')
export class User {
  // ============================================================
  // 🆔 IDENTIFIANT UNIQUE
  // ============================================================
  @PrimaryGeneratedColumn()
  id: number;

  // ============================================================
  // 📧 INFORMATIONS DE COMPTE
  // ============================================================
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // ============================================================
  // 📁 RELATION AVEC LES FICHIERS
  // ============================================================
  @OneToMany(() => FileEntity, (file) => file.owner)
  files: FileEntity[];

  // ============================================================
  // 🕒 DATES AUTOMATIQUES
  // ============================================================
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
