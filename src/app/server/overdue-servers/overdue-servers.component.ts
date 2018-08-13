import { Component, Input } from '@angular/core';
import { Server } from '../server';

@Component({
  selector: 'overdue-servers',
  templateUrl: './overdue-servers.component.html',
  styleUrls: ['./overdue-servers.component.css']
})
export class OverdueServersComponent {

  @Input() servers: Server[];

}
