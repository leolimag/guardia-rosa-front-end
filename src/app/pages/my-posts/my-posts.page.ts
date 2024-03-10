import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActionSheetController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { ToastService } from 'src/app/components/toast/toast.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.page.html',
  styleUrls: ['./my-posts.page.scss'],
})
export class MyPostsPage implements OnInit {

  page: number = 0;
  posts:any[] = [];

  constructor(private homeService: HomeService, private alertController: AlertController, private toast: ToastService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.page = 0;
    this.getPostByUser(20, this.page);
  }

  async confirmDeletePost(post: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      subHeader: '',
      message: 'Ao deletar o post, não será possível reverter essa ação.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Excluir',
          role: 'confirm',
          handler: () => {            
            this.deletePost(post);
          },
        },
      ],
    });
  
    await alert.present();
  }

  onIonInfinite(ev: any) {
    this.getPostByUser(20, ++this.page);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  getPostByUser(quantity:number, page:number) {
    this.homeService.getPostsByUser(quantity, page).subscribe({
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

  deletePost(post: any) {
    this.homeService.deletePost(post).subscribe({
      next: () => {
        this.loadPosts();
      },
      error: (error) => {
        this.toast.presentToast("top", error.error, 5000);
      }
    })
  }

}
