import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { CommentModule } from './comments/comment.module';

// ⭐ Import explicite des entités
import { User } from './users/user.entity';
import { FileEntity } from './entities/file.entity';
import { DownloadLinkEntity } from './entities/download_link.entity';
import { TagEntity } from './entities/tag.entity';

@Module({
  imports: [
    CommentModule,
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      autoLoadEntities: false,

      // ⭐ Ajouter TOUTES les entités utilisées
      entities: [
        User,
        FileEntity,
        DownloadLinkEntity,
        TagEntity,
      ],

      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    FilesModule,
  ],
})
export class AppModule {}
