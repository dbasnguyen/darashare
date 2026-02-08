/**
 * Comment Controller
 * This controller exposes REST API endpoints for comments:
 * - POST /comments/:token  -> create a comment
 * - GET /comments/:token   -> list comments for a file
 * - DELETE /comments/:id   -> delete a comment
 */

import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private service: CommentService) {}

  @Post(':token')
  create(@Param('token') token: string, @Body('content') content: string) {
    return this.service.create(token, content);
  }

  @Get(':token')
  find(@Param('token') token: string) {
    return this.service.findByFileToken(token);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
