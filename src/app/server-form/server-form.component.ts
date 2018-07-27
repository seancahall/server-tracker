import { Component, OnInit } from '@angular/core';
import { Server }    from '../server';
import { ServerService } from '../server.service';

@Component({
  selector: 'server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {

  constructor(private ServerService: ServerService) { }

    id: number;
  	hostname: string;
  	description: string;
  	ip: string;
  	deadline: any;
  	setup: boolean;
    submitted: boolean;
    currentDate: any;
    servers = [];

  ngOnInit() {
    this.submitted = true;
    this.currentDate = new Date();
    this.currentDate.setHours(0,0,0,0);
    this.currentDate = this.currentDate.toISOString();
    this.getServers();
  }

  // starter record
  model = new Server(0, '', '', '', '', false);
  

  onSubmit() { 
    this.submitted = true; 
    // Naive unique ID
    this.id = this.servers[this.servers.length-1].id + 1;
    this.hostname = this.model.hostname;
    this.ip = this.model.ip;
    this.description = this.model.description;
    if(this.model.deadline !== null && typeof this.model.deadline === 'object' && this.model.deadline.hasOwnProperty('year')) {
      this.deadline = new Date(this.model.deadline.month + '/' + this.model.deadline.day + '/' + this.model.deadline.year).toISOString();
    }
    this.setup = false;
    // define a new server object
    const newServer = new Server(this.id, this.hostname, this.description, this.ip, this.deadline, this.setup);
    // add to server array
    this.servers.push(newServer);

  }

  getServers(): void {
    this.servers = this.ServerService.getServers();
  }
  
  // remove server from working list
  removeServer(id){
    if(id){
      this.servers = this.servers.filter( s => s.id !== id);
    }
  }

  // mark server record as complete
  setupServer(id){
    if(id){
      this.servers.filter(s => s.id === id)[0].setup = true;
    }
  }

  // calculate the number of days past due
  getDays(deadline) {
    const parsedDate = new Date(deadline);
    const todaysDate = new Date(this.currentDate);
    const timeDiff = Math.abs(todaysDate.getTime() - parsedDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays > 1 ? diffDays + ' days ago' : diffDays + ' day ago';
  }

  newServer() {
    this.model = new Server(0, '', '', '', '', false);
  }

  // check if task is overdue
  dateFilter(deadline) {
    const parsedDate = new Date(deadline);
    const todaysDate = new Date(this.currentDate);
    return todaysDate > parsedDate;
  }

}
