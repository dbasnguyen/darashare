import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { FileEntity } from './file.entity';

@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => FileEntity, (file) => file.tags)
  files: FileEntity[];
}
