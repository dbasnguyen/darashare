/**
 * Comment List Component
 * This component displays comments for a file and allows:
 * - Adding a comment
 * - Listing comments
 * - Deleting a comment
 */

import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CommentListComponent implements OnInit {
  @Input() fileToken = '';

  comments: any[] = [];
  newComment = '';
  loading = false;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.loading = true;
    this.commentService.getComments(this.fileToken).subscribe({
      next: (data) => {
        this.comments = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addComment() {
    if (!this.newComment.trim()) return;

    this.commentService.addComment(this.fileToken, this.newComment).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments();
      }
    });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe({
      next: () => this.loadComments()
    });
  }
}
