import express, { Express } from "express";
import http from "http";

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

  constructor(config?: ApplicationConfig) {
    this.initConfig(config);
    this.initServer();
  }

  private initConfig(config?: ApplicationConfig): void {
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

    this.httpServer = http.createServer(this.app);
  }

  public async boot(): Promise<void> {}

  public async start(): Promise<void> {
    this.httpServer.listen(this.configs.port);
  }

  public async stop(): Promise<void> {
    this.httpServer.close();
  }
}
