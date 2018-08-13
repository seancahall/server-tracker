import { Pipe, PipeTransform } from '@angular/core';
import { Server } from '../server';

@Pipe({
  name: 'overdueServers',
  pure: false
})
export class OverdueServersPipe implements PipeTransform {

  transform(allServers: Server[]): any {
    return allServers.filter((server) => !server.setup && this.dateFilter(server.deadline));
  }

  // check if server is overdue
  dateFilter(deadline: string): boolean {

    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    const strCurrrentDate = currentDate.toISOString();
    const parsedDate = new Date(deadline);
    const todaysDate = new Date(strCurrrentDate);

    return todaysDate > parsedDate;
  }

}
