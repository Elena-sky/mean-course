import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   { title: '1 Post', content: 'This is 1 pos\'t content'},
  //   { title: '2 Post', content: 'This is 2 pos\'t content'},
  //   { title: '3 Post', content: 'This is 3 pos\'t content'},
  // ];

  @Input() posts: Post[] = [];
  private  postsSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(postId: string): void {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
