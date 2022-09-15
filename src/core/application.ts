import express, { Express } from "express";
import http from "http";
import { Context } from "./context";
import { banner, Logger } from "./logging";

export interface ApplicationConfig {
  host?: string;
  port?: number;
  ssl?: boolean;
  url?: string;
}

export class Application {
  protected app: Express;
  protected httpServer: http.Server;
  public configs: ApplicationConfig;

  private context: Context;

  public logger: Logger;

  constructor(config?: ApplicationConfig) {
    this.logger = new Logger("Application");
    console.log(banner);

    this.initConfig(config);
    this.initServer();
  }

  private initConfig(config?: ApplicationConfig): void {
    this.logger.debug(`Initialize configurations`);
    this.configs = {
      host: config?.host ?? "localhost",
      port: config?.port ?? 3000,
      ssl: config?.ssl ?? false,
    } as ApplicationConfig;

    this.configs.url = `http${this.configs.ssl ? "s" : ""}://${
      this.configs.host
    }:${this.configs.port}`;
  }

  private initServer(): void {
    this.app = express();
    this.logger.debug(`Http Server initializing..`);
    this.httpServer = http.createServer(this.app);
  }

  public async start(): Promise<void> {
    this.logger.debug(`Server starting..`);
    this.httpServer.listen(this.configs.port);
  }

  public async stop(): Promise<void> {
    this.httpServer.close();
  }
}
