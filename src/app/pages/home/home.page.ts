import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { ModalComponent } from '../../components/modal/modal.component';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ToastService } from 'src/app/components/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  likes : number = 0;
  message: any;
  page: number = 0;
  posts:any[] = [];

  constructor(
    private homeService: HomeService,
    private modalController: ModalController,
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
    ) {
      this.homeService.joinRoom();
     }

  async addPost() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    });

    modal.onDidDismiss().then((result = {}) => {
      const {data} = result;
      let body =  {"conteudo" : data,  "usuarioId" : this.userService.getUser().id };

      if (data) {
        return this.homeService.addPost(body).subscribe({
          next: () => {
            this.setPosts(20, 0);
          },
          error: (error) => {
            this.toastService.presentToast('bottom', error.error, 2000);
          }
        })
      } else {
        return;
      }
    });

    return await modal.present();
  }

  setPosts(quantity:number, page:number) {
    this.homeService.getPosts(quantity, page).subscribe({
      next: (posts: any) => {
        if (page == 0) {
          this.posts = posts.content;
          return;
        }
        this.posts = this.posts.concat(posts.content); 
      },
      error: (error) => {
        console.error(error.error);
      }

    });
  }

  async openPostModal(post: any) {
    const modal = await this.modalController.create({
      component: PostModalComponent,
      componentProps: {
        postContent: post.content
      }
    });
  
    return await modal.present();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/home') {
          this.page = 0;
          this.setPosts(20, this.page);
        }
      }
    });

  }

  onIonInfinite(ev: any) {
    this.setPosts(20, ++this.page);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  goToPost(post:any) {
    this.router.navigate([`/post/${post.id}/false`]);
  }

  like(id: number) {
    this.homeService.likeSocketPost(id).subscribe(liked => {
      this.updateLikeCount(id, liked);
    });
  }

  updateLikeCount(postId: number, liked: any): void {
    let div = document.getElementById(`${postId}-curtidas`) as HTMLElement;
    let icon = document.getElementById(`${postId}-heart`) as HTMLElement;    
    icon.setAttribute('name', liked.liked ? 'heart-outline' : 'heart');
    div.textContent = liked.curtidas;
  }

  commentPost(post:any) {
    this.router.navigate([`/post/${post.id}/true`]);
  }

}
