import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  private key = 'qzjYlELTHI61gR4/4J0iD0zINtCuIlH8avwBWb5NehWY/oJdrQLjqT0WceU3CclC';

  constructor() { }

  // Encrypt data
  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.key).toString();
  }

  // Decrypt data
  decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    if(item) {
      const decryptedItem = this.decrypt(item);
      return JSON.parse(decryptedItem);
    }
    return null;
  }

  setItem(key: string, value: any): void {
    const item = JSON.stringify(value);
    const encryptedItem = this.encrypt(item);
    localStorage.setItem(key, encryptedItem);
  }
  
  removeItem(){
    localStorage.clear();
  }
  
  getUserId(): number {
    const userData = this.getItem('user');
    return userData.id;
  }
  
  getUserName(): string {
    const userData = this.getItem('user');
    return userData?.first_name + ' ' + userData?.last_name;
  }
    
  getUserEmail(): string {
    const userData = this.getItem('user');
    return userData.email;
  }

  getUserRole(): string {
    const userData = this.getItem('user');
    return userData.role.name;
  }

}
