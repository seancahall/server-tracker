import { Component, OnInit, ViewChild } from '@angular/core';
import { Server }    from './server';
import { ServerService } from './server.service';
import { ServerFormComponent } from './server-form/server-form.component';

@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  servers: Server[];
  hideForm: boolean = true;

  @ViewChild(ServerFormComponent) serverForm;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.getServers();
  }

  /** we get the value of the property submitted from the child form component 
   * lets us hide the form when the cancel button is clicked */
  ngAfterViewInit() {
    this.hideForm = this.serverForm.submitted;
  }

  getServers(): void {
    this.serverService
        .getServers()
        .subscribe(servers => this.servers = servers);
  }

}
