import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Post } from '../post.model';

import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit{
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;

  @Output() postCreated = new EventEmitter<Post>();

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMac: ParamMap) => {
      if (paramMac.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMac.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm): void
  {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
