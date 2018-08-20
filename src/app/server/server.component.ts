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

  @ViewChild(ServerFormComponent)
  myServerForm: ServerFormComponent;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.getServers();
  }

  /** we get the value of the hideForm property from the child form component 
  which lets us hide the form when the cancel button is clicked */
  ngAfterContentChecked() {
    if(!this.hideForm && this.myServerForm.hideForm) {
      this.hideForm = true;
      this.myServerForm.resetFlag();
    }
  }

  getServers(): void {
    this.serverService
        .getServers()
        .subscribe(servers => this.servers = servers);
  }

}
