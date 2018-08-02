import { Injectable } from '@angular/core';
import { Server } from './server';
import { Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serversUrl = 'api/servers';  // URL to web api

  constructor(private httpc: HttpClient) {
  }

  // mock api call to return data to build server table
  getServers():Observable<any>{
    return this.httpc.get<any>(this.serversUrl); 
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
