import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overdueServers',
  pure: false
})
export class OverdueServersPipe implements PipeTransform {

  transform(servers): any {
    if(servers instanceof Array) {
      return servers.filter((server) => !server.setup && Date.now() > Date.parse(server.deadline)
      );
    }
    return [];
  }

}
