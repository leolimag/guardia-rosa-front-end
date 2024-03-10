import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  id: number = 0;
  openModalComment: any = false;
  post: any;
  comentarios: any[] = [];
  page: number = 0;
  openModal: boolean = false;
  user: any

  constructor(private homeService: HomeService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private modalController: ModalController,
    private userService: UserService,
    private toastService: ToastService,
    private actionSheetCtrl: ActionSheetController,
    private cdr: ChangeDetectorRef
    ) 
  { 
    this.user = this.userService.getUser().id;
  }

  ngOnInit() {
    this.loadComments();
  }

  async presentActionSheet(comentario: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          data: {
            action: 'action' ,
          },
          handler: () => {
            this.deleteComment(comentario);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async addComment() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    });

    modal.onDidDismiss().then((result = {}) => {
      const {data} = result;
      let body =  {"conteudo" : data,  "usuarioId" : this.userService.getUser().id, "postId" : this.id };

      if (data) {
        return this.homeService.addComment(body).subscribe({
          next: () => {
            this.getPostById();
            this.openModal = true;
            this.ngOnInit();
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

  back() {
    this.router.navigate(['/home']);
  }

  onIonInfinite(ev: any) {
    this.getComments(10, ++this.page);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  deleteComment(comentario: any) {
    this.homeService.deleteComment(comentario).subscribe({
      next: () => {
        this.openModal = true;
        this.loadComments();
        this.router.navigate([`/post/${this.id}/${this.openModalComment}`]);
      },
      error: (error) => {
        this.toastService.presentToast("top", error.error, 5000);
      }
    })
  }

  loadComments() {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.getPostById();

      this.page = 0;
      this.getComments(10, this.page);
      this.openModalComment = params.get('open-modal-comment');      

      if (this.openModalComment === 'true' && !this.openModal) {
        this.addComment()
      } 

      this.cdr.detectChanges();
    })
  }

  getPostById() {
    this.homeService.getPostById(this.id).subscribe({
      next: (response: any) => {
        this.post = response;
      }, 
      error: (error) => {
        console.error(error.error);
      }
    })
  }

  getComments(quantity: number, page: number) {
    this.homeService.getComments(this.id, quantity, page).subscribe({
      next: (response: any) => {        
        if (page == 0){
          this.comentarios = response.content;
          return;
        }
        this.comentarios = this.comentarios.concat(response.content);        
      }, 
      error: (error) => {
        console.error(error.error);
      }
    })

  }

  likePost(id: number) {
    this.homeService.likeSocketPost(id).subscribe(liked => {
      this.updateLikeCount(id, liked);
    });
  }

  likeComment(id: number) {
    this.homeService.likeSocketComment(id, this.id).subscribe(liked => {      
      this.updateLikeCommentCount(id, liked);
    });
  }

  updateLikeCommentCount(commentId: number, liked: any) {
    let div = document.getElementById(`${commentId}-curtidasComment`) as HTMLElement;
    let icon = document.getElementById(`${commentId}-heartComment`) as HTMLElement;    

    icon.setAttribute('name', liked.liked ? 'heart-outline' : 'heart');
    div.textContent = liked.curtidas;
  }

  updateLikeCount(postId: number, liked: any): void {
    let div = document.getElementById(`${postId}-curtidass`) as HTMLElement;
    let icon = document.getElementById(`${postId}-hearts`) as HTMLElement;    

    icon.setAttribute('name', liked.liked ? 'heart-outline' : 'heart');
    div.textContent = liked.curtidas;
  }

}
