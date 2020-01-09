import { Injectable } from '@angular/core';
import * as passworder from 'browser-passworder';

@Injectable({
  providedIn: 'root'
})
export class EncryptionNativeService {

  constructor() { }

  async encrypt(data: string, password: string): Promise<string> {
    return await passworder.encrypt(password, data);
  }

  async decrypt(data: string, password: string): Promise<string> {
    return await passworder.decrypt(password, data);
  }
}
