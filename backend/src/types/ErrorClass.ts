export class ErrorClass extends Error {
  status:number;
  stat:boolean;

  constructor(stat:boolean = false, message:string, status?:number){
    super(message);
    this.name = 'ErrorClass';
    this.status = status || 500;
    this.stat = stat || false
    Error.captureStackTrace(this, ErrorClass);
  }
}