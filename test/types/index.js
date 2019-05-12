// @flow

export interface VerdaccioConfig {
  storagePath: string;
  configPath: string;
  domainPath: string;
  port: number;
}

export interface RequestPromise {
  status(reason: any): any;
  body_ok(reason: any): any;
  body_error(reason: any): any;
  request(reason: any): any;
  response(reason: any): any;
  send(reason: any): any;
}

export interface ServerProcess {
  bridge: ServerBridge;
  config: VerdaccioConfig;
  childFork: any;
  isDebug: boolean;
  silence: boolean;
  init(): Promise<any>;
  stop(): void;
}

declare class verdaccio$PromiseAssert<RequestPromise> extends Promise<any> {
  constructor(options: any): RequestPromise;
}

export interface ServerBridge {
  url: string;
  userAgent: string;
  authstr: string;
  request(options: any): typeof verdaccio$PromiseAssert;
  auth(name: string, password: string): RequestPromise;
  logout(token: string): Promise<any>;
  auth(name: string, password: string): RequestPromise;
  getPackage(name: string): Promise<any>;
  putPackage(name: string, data: any): Promise<any>;
  putVersion(name: string, version: string, data: any): Promise<any>;
  getTarball(name: string, filename: string): Promise<any>;
  putTarball(name: string, filename: string, data: any): Promise<any>;
  removeTarball(name: string): Promise<any>;
  removeSingleTarball(name: string, filename: string): Promise<any>;
  addTag(name: string, tag: string, version: string): Promise<any>;
  putTarballIncomplete(name: string, filename: string, data: any, size: number, cb: Function): Promise<any>;
  addPackage(name: string): Promise<any>;
  whoami(): Promise<any>;
  ping(): Promise<any>;
  debug(): RequestPromise;
}
