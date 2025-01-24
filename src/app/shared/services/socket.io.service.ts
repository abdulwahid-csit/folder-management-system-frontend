import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  private socketUrl = 'http://localhost:3000'; // URL of your backend server

  constructor() {
    const token = localStorage.getItem('auth_token'); // Or use another method to get the token
    this.socket = io(this.socketUrl, {
      auth: {
        token: token,
      },
    });

    this.listenForFolderShared();
  }

  listenForFolderShared() {
    return new Observable((observer) => {
      this.socket.on('folderShared', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
