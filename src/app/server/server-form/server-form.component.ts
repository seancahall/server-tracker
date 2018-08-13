import { Component, OnInit, Input } from '@angular/core';
import { Server }    from '../server';
import { ServerService } from '../server.service';

@Component({
  selector: 'server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {
  @Input() servers: Server[];

  constructor(private serverService: ServerService) { }

  submitted: boolean = true;

  ngOnInit() {
    this.newServer();
  }

  // starter record
  model = new Server();
  
  onSubmit() { 
    this.submitted = true; 
    let deadline;

    if(this.model.deadline !== null && typeof this.model.deadline === 'object' && this.model.deadline.hasOwnProperty('year')) {
       deadline = new Date(this.model.deadline.month + '/' + this.model.deadline.day + '/' + this.model.deadline.year).toISOString();
    }
    // define a new server object
    const newServer = new Server();
    newServer.id =  this.servers[this.servers.length-1].id + 1;
    newServer.hostname = this.model.hostname;
    newServer.ip = this.model.ip;
    newServer.description = this.model.description;
    newServer.deadline = deadline;
    newServer.setup = false;
    
    // pass to service to post
    this.serverService
      .addServer(newServer)
      .subscribe(server=> this.servers.push(server));
  }

  // refresh table
  getServers(): void {
    this.serverService
        .getServers()
        .subscribe(servers => this.servers = servers);
  }

  newServer() {
    this.model = new Server();
  }

}
