import { Injectable } from '@angular/core';
import { Server } from './server';
import { SERVERS } from './mock-servers';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }

  getServers(): Server[] {
    return SERVERS;
  }
  
}
