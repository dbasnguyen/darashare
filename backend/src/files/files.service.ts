import {
  Injectable,
  NotFoundException,
  GoneException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '../entities/file.entity';
import { join } from 'path';
import { existsSync } from 'fs';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly filesRepo: Repository<FileEntity>,
  ) {}

  // ============================================================
  // 📤 UPLOAD — Sauvegarde des métadonnées du fichier en base
  // ============================================================
  async saveFileMetadata(
    file: any,
    user: any,
    days: number,
    password?: string,
  ) {
    const token = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    let passwordHash: string | undefined;

    // ⭐ Hash du mot de passe si fourni
    if (password && password.trim().length > 0) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const newFile = this.filesRepo.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,

      // ⭐ Relation ManyToOne
      owner: { id: user.userId } as any,

      downloadToken: token,
      downloadTokenExpiresAt: expiresAt,
      passwordHash,
    });

    await this.filesRepo.save(newFile);

    return {
      message: 'File uploaded successfully',
      fileId: newFile.id,
      downloadUrl: `/files/download/${token}`,
      expiresAt,
    };
  }

  // ============================================================
  // 📥 INFO — Vérification du token + chargement du propriétaire
  // ============================================================
  async getFileByToken(token: string) {
    const file = await this.filesRepo.findOne({
      where: { downloadToken: token },
      relations: ['owner'],
    });

    if (!file) return null;

    if (
      !file.downloadTokenExpiresAt ||
      file.downloadTokenExpiresAt < new Date()
    ) {
      return null;
    }

    return file;
  }

  // ============================================================
  // 🔐 Vérification du mot de passe
  // ============================================================
  async verifyPassword(file: FileEntity, password?: string) {
    if (!file.passwordHash) return true; // pas protégé

    if (!password) {
      throw new UnauthorizedException('Mot de passe requis');
    }

    const ok = await bcrypt.compare(password, file.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return true;
  }

  // ============================================================
  // 📜 HISTORIQUE — Fichiers d’un utilisateur
  // ============================================================
  async findAllByUser(userId: number) {
    return this.filesRepo.find({
      where: { owner: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  // ============================================================
  // 🗑️ DELETE — Suppression d’un fichier si propriétaire
  // ============================================================
  async deleteFileForUser(fileId: number, userId: number) {
    const file = await this.filesRepo.findOne({
      where: { id: fileId },
      relations: ['owner'],
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (!file.owner || file.owner.id !== userId) {
      throw new NotFoundException('File not found');
    }

    await this.filesRepo.remove(file);
  }

  // ============================================================
  // 📥 DOWNLOAD — Téléchargement du fichier
  // ============================================================
  async downloadFile(token: string, res: any, password?: string) {
    const file = await this.filesRepo.findOne({
      where: { downloadToken: token },
    });

    if (!file) {
      throw new NotFoundException('Lien de téléchargement introuvable');
    }

    const now = new Date();
    if (!file.downloadTokenExpiresAt || file.downloadTokenExpiresAt < now) {
      throw new GoneException('Le lien a expiré');
    }

    // ⭐ Vérification du mot de passe
    await this.verifyPassword(file, password);

    const filePath = this.getFilePath(file.filename);

    res.setHeader('Content-Type', file.mimeType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.originalName}"`,
    );

    return res.sendFile(filePath);
  }

  // ============================================================
  // 📁 Chemin physique du fichier
  // ============================================================
  getFilePath(filename: string) {
    const filePath = join(process.cwd(), 'uploads', filename);

    if (!existsSync(filePath)) {
      throw new Error('File not found on disk');
    }

    return filePath;
  }
}
