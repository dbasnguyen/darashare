/**
 * Module Files
 * -------------
 * Gère :
 * - l’upload de fichiers
 * - le téléchargement sécurisé via token
 * - l’accès au repository File via TypeORM
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

// ⭐ Import correct : la seule entité File valide
import { FileEntity } from '../entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]), // ⭐ plus de ./file.entity
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
