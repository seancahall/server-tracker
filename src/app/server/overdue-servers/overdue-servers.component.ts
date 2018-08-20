import { Component, Input } from '@angular/core';
import { Server } from '../server';
import * as moment from 'moment';

@Component({
  selector: 'overdue-servers',
  templateUrl: './overdue-servers.component.html',
  styleUrls: ['./overdue-servers.component.css']
})
export class OverdueServersComponent {

  @Input() servers: Server[];
  
  // for use in the pipe
  currentDate = new Date();

}
