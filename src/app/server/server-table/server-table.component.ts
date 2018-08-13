import { Component, OnInit, Input } from '@angular/core';
import { Server } from '../server';
import { ServerService } from '../server.service';

@Component({
  selector: 'server-table',
  templateUrl: './server-table.component.html',
  styleUrls: ['./server-table.component.css']
})
export class ServerTableComponent implements OnInit {

  @Input() servers: Server[];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  // mark server record as complete
  setupServer(server: Server): void {
    if(server){
      server.setup = true;
      this.serverService
        .updateServer(server)
        .subscribe(server => {
          const serverIndex = server ? this.servers.findIndex(s => s.id === server.id) : -1;
          if (serverIndex > -1) { 
            this.servers[serverIndex] = server; 
          }
       })
    }
  }

  // delete server
  removeServer(id: number): void {
    if(id){
      this.serverService
        .deleteServer(id)
        .subscribe();
        this.getServers();
    }
  }

  // refresh table
  getServers(): void {
    this.serverService
        .getServers()
        .subscribe(servers => this.servers = servers);
  }

}
