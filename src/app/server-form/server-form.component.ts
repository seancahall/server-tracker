import { Component, OnInit } from '@angular/core';
import { Server }    from '../server';

@Component({
  selector: 'server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {

    id: number;
  	hostname: string;
  	description: string;
  	ip: string;
  	deadline: any;
  	setup: boolean;
    submitted: boolean;
    currentDate: any;

  ngOnInit() {
    this.submitted = true;
    this.currentDate = new Date();
    this.currentDate.setHours(0,0,0,0);
    this.currentDate = this.currentDate.toISOString();
  }

  // starter record
  model = new Server(0, '', '', '', '', false);

  // some dummy data 
  servers = [
    new Server(101, 'core', 'The central devices we rely on and scan regularly', '151.101.65.164', '2018-03-23T18:30:00.000Z', true),
    new Server(102, 'backup', 'Lorem ipsum backup.', '104.126.20.140', '2018-09-23T18:30:00.000Z', false),
    new Server(103, 'external', 'Lorem ipsum external.', '151.101.1.67', '2017-12-23T18:30:00.000Z', true),
  ];

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
