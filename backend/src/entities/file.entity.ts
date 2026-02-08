import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { DownloadLinkEntity } from './download_link.entity';
import { TagEntity } from './tag.entity';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  // ⭐ NOUVEAU : token de téléchargement
  @Column({ nullable: true })
  downloadToken: string;

  // ⭐ NOUVEAU : expiration du token
  @Column({ type: 'timestamp', nullable: true })
  downloadTokenExpiresAt: Date;

  // ⭐ NOUVEAU : mot de passe hashé (optionnel)
  @Column({ nullable: true })
  passwordHash?: string;

  @ManyToOne(() => User, (user) => user.files, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => DownloadLinkEntity, (link) => link.file)
  links: DownloadLinkEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.files, { cascade: true })
  @JoinTable({
    name: 'file_tags',
    joinColumn: { name: 'file_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: TagEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
