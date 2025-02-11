import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  private key = 'qzjYlELTHI61gR4/4J0iD0zINtCuIlH8avwBWb5NehWY/oJdrQLjqT0WceU3CclC';

  constructor() { }

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.key).toString();
  }

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

  designation(){
    const userData = this.getItem('user');
    return userData?.desegnation;
  }

  getDepartment(){
    const userData = this.getItem('user');
    return userData?.department;
  }

  getUserEmail(): string {
    const userData = this.getItem('user');
    return userData.email;
  }
  
  getUserProfile(): string {
    const userData = this.getItem('user');
    return environment.apiUrl + 'uploaded-files/' + userData.profile_picture || '../../../../../assets/images/iis.svg';
  }

  getUserRole(): string {
    const userData = this.getItem('user');
    return userData.role.name || '';
  }

  getUserOrganization(): string {
    const userData = this.getItem('user');
    return userData.organization.id || '';
  }
  
  getUserOrganizationLogo(): string {
    const userData = this.getItem('user');
    return userData.organization.logo || '';
  }

  getUserOrganizationName(): string {
    const userData = this.getItem('user');
    return userData.organization.name || '';
  }

  getUserOrganizationDomain(): string {
    const userData = this.getItem('user');
    return userData.organization.domain || '';
  }

  getUserPermission() {
    const userData = this.getItem('user');
    return userData.permissions || 'NA';
  }
  
  hasPermission(permissionName: string): boolean {
    const permissionData = this.getUserPermission();
    return permissionData.some((permission: { slug: string; }) => permission.slug === permissionName);
  }
}
