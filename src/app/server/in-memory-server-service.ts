import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryServerService implements InMemoryDbService {
  createDb() {
    const servers = [
      {id: 101, hostname: 'core', description: 'The central devices we rely on and scan regularly', ip: '151.101.65.164', deadline: '2018-03-23T18:30:00.000Z', setup: true},
      {id: 102, hostname: 'backup', description: 'Lorem ipsum backup.', ip: '104.126.20.140', deadline: '2018-09-23T18:30:00.000Z', setup: false},
      {id: 103, hostname: 'external', description: 'Lorem ipsum external.', ip: '151.101.1.67', deadline: '2017-12-23T18:30:00.000Z', setup: false}
    ];
    return { servers };
  }
}