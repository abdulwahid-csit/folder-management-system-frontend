import { Injectable } from '@angular/core';
import { StorageEngine } from '@ngxs/storage-plugin';

@Injectable({ providedIn: 'root' })
export class CustomStorageEngine implements StorageEngine {
    
    private store: { [key: string]: any } = {};

    get length(): number {
        return Object.keys(this.store).length;
    }

    getItem(key: string): any {
        return this.store[key] || null;
    }

    setItem(key: string, val: any): void {
        this.store[key] = val;
    }

    removeItem(key: string): void {
        delete this.store[key];
    }

    clear(): void {
        this.store = {};
    }

    // get length(): number {
    //     return sessionStorage.length;
    // }

    // getItem(key: string): any {
    //     const value = sessionStorage.getItem(key);
    //     return value ? JSON.parse(value) : null;
    // }

    // setItem(key: string, val: any): void {
    //     sessionStorage.setItem(key, JSON.stringify(val));
    // }

    // removeItem(key: string): void {
    //     sessionStorage.removeItem(key);
    // }

    // clear(): void {
    //     sessionStorage.clear();
    // }
}
