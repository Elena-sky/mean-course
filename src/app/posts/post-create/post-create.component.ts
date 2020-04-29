import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Post } from '../post.model';

import { NgModule } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  form: FormGroup;
  imagePreview: string|ArrayBuffer;

  @Output() postCreated = new EventEmitter<Post>();

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null, {validators: Validators.required}),
      image: new FormControl(null, {validators: Validators.required})
    });
    this.route.paramMap.subscribe((paramMac: ParamMap) => {
      if (paramMac.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMac.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content});
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePost(): void
  {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }
}
