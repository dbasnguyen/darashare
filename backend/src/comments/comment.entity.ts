/**
 * Comment Entity
 * This file defines the Comment table structure using TypeORM.
 * Each comment is linked to a file using the fileToken field.
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileToken: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
