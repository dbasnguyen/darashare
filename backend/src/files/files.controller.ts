// backend/src/files/files.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Get,
  Param,
  Res,
  Delete,
  Header,
  Body,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from './files.service';
import type { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // ============================================================
  // 📤 UPLOAD — Upload d’un fichier par un utilisateur connecté
  // ============================================================
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any, @Req() req) {
    const rawDays = req.body.expirationDays;
    const days = rawDays && !isNaN(Number(rawDays)) ? Number(rawDays) : 7;

    // ⭐ Mot de passe optionnel
    const password = req.body.password || null;

    const saved = await this.filesService.saveFileMetadata(
      file,
      req.user,
      days,
      password,
    );

    return {
      downloadUrl: saved.downloadUrl,
      expiresAt: saved.expiresAt,
    };
  }

  // ============================================================
  // 📥 INFO — Informations sur un fichier via token (public)
  // ============================================================
  @Get('info/:token')
  async getFileInfo(@Param('token') token: string) {
    const file = await this.filesService.getFileByToken(token);
    if (!file) {
      throw new NotFoundException('Lien invalide ou expiré');
    }

    return {
      valid: true,
      filename: file.originalName,
      size: file.size,
      mimeType: file.mimeType,
      expiresAt: file.downloadTokenExpiresAt,
      ownerId: file.owner?.id,
      passwordProtected: !!file.passwordHash,
    };
  }

  // ============================================================
  // 📥 DOWNLOAD — Téléchargement via token sécurisé (public)
  // ============================================================
  @Post('download/:token')
  async download(
    @Param('token') token: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    try {
      return await this.filesService.downloadFile(token, res, password);
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        return res.status(401).json({ error: err.message });
      }
      throw err;
    }
  }

  // ============================================================
  // 📜 HISTORIQUE — Fichiers de l’utilisateur connecté
  // ============================================================
  @UseGuards(JwtAuthGuard)
  @Get('my')
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  async getMyFiles(@Req() req) {
    const userId = req.user.userId;
    const files = await this.filesService.findAllByUser(userId);
    const now = new Date();

    return files.map((f) => {
      const isExpired = f.downloadTokenExpiresAt
        ? f.downloadTokenExpiresAt < now
        : false;

      return {
        id: f.id,
        filename: f.filename,
        originalName: f.originalName,
        size: f.size,
        mimeType: f.mimeType,
        createdAt: f.createdAt,
        expiresAt: f.downloadTokenExpiresAt,
        isExpired,
        downloadToken: f.downloadToken,
        passwordProtected: !!f.passwordHash,
      };
    });
  }

  // ============================================================
  // 🗑️ DELETE — Suppression de TOUS les fichiers de l’utilisateur
  // ============================================================
  @UseGuards(JwtAuthGuard)
  @Delete('my')
  async deleteAllMyFiles(@Req() req) {
    const userId = req.user.userId;
    const files = await this.filesService.findAllByUser(userId);

    for (const f of files) {
      await this.filesService.deleteFileForUser(f.id, userId);
    }

    return { success: true };
  }

  // ============================================================
  // 🗑️ DELETE — Suppression d’un fichier de l’utilisateur
  // ============================================================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMyFile(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    await this.filesService.deleteFileForUser(Number(id), userId);
    return { success: true };
  }
}
