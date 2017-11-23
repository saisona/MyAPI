export class SSEService {

  constructor(pathSSE, ...args) {
    if(!pathSSE) {
      throw new Error("path from EventSource is missing !");
    }
    this.SSElistener = new EventSource(pathSSE);
    this.listeners = [];
    for( let i=0; i < args.length; i++ ) {
      if(typeof args[i] !== EventTarget) {
        throw new Error(`Argument ${i} can't be listened ! It may be not an EventTarget.`);
      }
      this.listeners.push(args[i]);
    }
    this.SSElistener.onmessage = this.handleMessage;
    this.SSElistener.onerror = SSEService.handleError;
  }

  handleMessage(msg) {
  //  TODO : Here to handle
    console.log(`MSG => ${msg}`);
  }
  
  static handleError(err) {
    throw new Error(err.message);
  }
}