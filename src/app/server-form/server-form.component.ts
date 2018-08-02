import { Component, OnInit } from '@angular/core';
import { Server }    from '../server';
import { ServerService } from '../server.service';

@Component({
  selector: 'server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {
  servers: Server[];
  constructor(private serverService: ServerService) { }

    submitted: boolean;
    currentDate: any;

  ngOnInit() {
    this.submitted = true;
    this.currentDate = new Date();
    this.currentDate.setHours(0,0,0,0);
    this.currentDate = this.currentDate.toISOString();
    this.getServers();
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

    // add to server array
   // this.servers.push(newServer);

    this.serverService
      .addServer(newServer)
      .subscribe(server=> this.servers.push(server));
  }

  getServers(): void {
    this.serverService
        .getServers()
        .subscribe(servers => this.servers = servers);
  }
  
  // remove server
  removeServer(id: number): void {
    if(id){
      this.serverService
        .deleteServer(id)
        .subscribe();
        this.getServers();
    }
  }

  // mark server record as complete
  setupServer(id: number): void {
    if(id){
      this.servers.filter(s => s.id === id)[0].setup = true;
    }
  }

  // calculate the number of days past due
  getDays(deadline: string): string {
    const parsedDate = new Date(deadline);
    const todaysDate = new Date(this.currentDate);
    const timeDiff = Math.abs(todaysDate.getTime() - parsedDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays > 1 ? diffDays + ' days ago' : diffDays + ' day ago';
  }

  newServer() {
    this.model = new Server();
  }

  // check if server is overdue
  dateFilter(deadline: string): boolean {
    const parsedDate = new Date(deadline);
    const todaysDate = new Date(this.currentDate);
    return todaysDate > parsedDate;
  }

}
