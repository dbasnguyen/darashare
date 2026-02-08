import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FileEntity } from './file.entity';

@Entity('download_links')
export class DownloadLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => FileEntity, (file) => file.links, { onDelete: 'CASCADE' })
  file: FileEntity;
}
