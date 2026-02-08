/**
 * Comment Service
 * This service handles all business logic related to comments:
 * - Create a comment
 * - List comments for a file
 * - Delete a comment
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}

  create(fileToken: string, content: string) {
    const comment = this.repo.create({ fileToken, content });
    return this.repo.save(comment);
  }

  findByFileToken(fileToken: string) {
    return this.repo.find({
      where: { fileToken },
      order: { createdAt: 'DESC' },
    });
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
