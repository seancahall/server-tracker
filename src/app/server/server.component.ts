import { Component, OnInit, ViewChild } from '@angular/core';
import { Server }    from './server';
import { ServerService } from './server.service';

@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  servers: Server[];
  hideForm: boolean = true;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.getServers();
  }

  getServers(): void {
    this.serverService
        .getServers()
        .subscribe(servers => this.servers = servers);
  }

}
