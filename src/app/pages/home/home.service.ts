import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  //private apiUrl = ' http://localhost:8082';
  private apiUrl = 'https://abraco-rosa-17121aee456e.herokuapp.com';
  private user = this.userService.getUser();
  private stompClient: any;
  
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`
    })
  };

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { 
    this.initConnectionSocket();
  }

  getPosts(quantity:number, page:number) : Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/posts?quantity=${quantity}&page=${page}&usuarioId=${this.user.id}`, this.httpOptions);
  }

  getPostsByUser(quantity:number, page:number) : Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/posts/${this.user.id}?quantity=${quantity}&page=${page}&usuarioId=${this.user.id}`, this.httpOptions);
  }

  addPost(body: any) {
    return this.http.post(`${this.apiUrl}/api/posts`, body, this.httpOptions);
  }

  deletePost(post: any) {
    return this.http.delete(`${this.apiUrl}/api/posts/${post}`, this.httpOptions);
  }

  deleteComment(comentario: any) {
    return this.http.delete(`${this.apiUrl}/api/comments/${comentario}`, this.httpOptions);
  }

  addComment(body: any) {
    return this.http.post(`${this.apiUrl}/api/comments`, body, this.httpOptions);
  }

  getPostById(id: number) {
    return this.http.get(`${this.apiUrl}/api/posts/selected/${id}?usuarioId=${this.user.id}`, this.httpOptions)
  }

  getComments(id: number, quantity: number, page: number) {
    return this.http.get(`${this.apiUrl}/api/comments/${id}?quantity=${quantity}&page=${page}&usuarioId=${this.user.id}`, this.httpOptions)
  }

  likeComment(id: number, postId: number) {
    let body = { id : id, postId : postId, usuarioId : this.user.id };
    return this.http.patch(`${this.apiUrl}/api/comments/like`, body, this.httpOptions);
  }

    initConnectionSocket() {
    //const url = 'localhost:8082/chat-socket';
    const url = 'https://abraco-rosa-17121aee456e.herokuapp.com/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      console.log('WebSocket conectado.');
    });
  }

  joinRoom() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(`/topic`, (messages: any) => {
      });
    } else {
      console.error('A conexão WebSocket não está estabelecida.');
    }
  }

  likeSocketPost(id: number): Observable<number> {
    const topic = `/topic/post/${id}`;
    let chatMessage = { id: id, usuarioId: this.user.id };
    this.stompClient.send(`/app/post/like/${id}`, {}, JSON.stringify(chatMessage));
    
    return new Observable<number>(observer => {
      this.stompClient.subscribe(topic, (response: any) => {        
        const liked = JSON.parse(response.body);        
        observer.next(liked);
      });
    });
  }

  likeSocketComment(id: number, postId: number): Observable<number> {
    const topic = `/topic/comentario/${id}`;
    let chatMessage = { id: id, usuarioId: this.user.id, postId: postId };
    
    this.stompClient.send(`/app/comentario/like/${id}`, {}, JSON.stringify(chatMessage));
    
    return new Observable<number>(observer => {
      this.stompClient.subscribe(topic, (response: any) => {        
        const liked = JSON.parse(response.body);        
        observer.next(liked);
      });
    });
  }

}
