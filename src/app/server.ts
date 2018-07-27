export class Server {

  constructor(
  	public id: number,
  	public hostname: string,
  	public description: string,
  	public ip: string,
  	public deadline: any,
  	public setup: boolean
  ) {  }

}
