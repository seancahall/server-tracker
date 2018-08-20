import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Server } from '../server';
import { ServerService } from '../server.service';

@Component({
  selector: 'server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.css']
})
export class ServerFormComponent implements OnInit {
  @Input() servers: Server[];
  serverForm: FormGroup;
  hideForm: boolean;

  constructor(private serverService: ServerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // define form builder group and validation rules
    this.serverForm = this.formBuilder.group({
      hostname: ['', [
        Validators.required, 
        Validators.maxLength(32), 
        Validators.pattern('^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$')]
      ],
      ip: ['', [
        Validators.required, 
        Validators.pattern('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')]
      ],
      description: ['', 
        Validators.required
      ],
      deadline: ['', 
        Validators.required
      ]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.serverForm.controls; }

  // add a new server
  onSubmit(form) {

    // stop here if form is invalid
    if (this.serverForm.invalid) {
      return;
    }

    // define a new server object
    const newServer = new Server();
    newServer.id = this.servers[this.servers.length - 1].id + 1;
    newServer.hostname = this.serverForm.value['hostname'];
    newServer.ip = this.serverForm.value['ip'];
    newServer.description = this.serverForm.value['description'];
    newServer.deadline = new Date (`${this.serverForm.value.deadline.month}/${this.serverForm.value.deadline.day}/${this.serverForm.value.deadline.year}`);
    newServer.setup = false;

    // pass to service to post
    this.serverService
      .addServer(newServer)
      .subscribe(server => this.servers.push(server));
    
    this.doReset(form);
  }

  // refresh table
  getServers(): void {
    this.serverService
      .getServers()
      .subscribe(servers => this.servers = servers);
  }

  doReset(form): void {
    form.resetForm();
  }

  resetFlag() {
    this.hideForm = false;
  }

}
