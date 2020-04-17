import { Component, Input } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // posts = [
  //   { title: '1 Post', content: 'This is 1 pos\'t content'},
  //   { title: '2 Post', content: 'This is 2 pos\'t content'},
  //   { title: '3 Post', content: 'This is 3 pos\'t content'},
  // ];

  @Input() posts: Post[] = [];
}
