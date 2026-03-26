declare module 'xo-connect' {
  export class XOConnectProvider {
    constructor(options?: any);
    request(params: any): Promise<any>;
    on(event: string, listener: (...args: any[]) => void): void;
    removeListener(event: string, listener: Function): void;
  }

  export class XOConnect {
    static connect(): Promise<any>;
    static getClient(): Promise<any>;
    static sendRequest(params: any): string;
    static disconnect(): void;
    static cancelRequest(id: string): void;
  }
}