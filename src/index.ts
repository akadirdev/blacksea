import { LedgerApplication } from "./examples/app";

async function main() {
  const app = new LedgerApplication({
    host: "localhost",
    port: 3001,
  });
  await app.boot();
  await app.start();

  console.log(`Application up and running on ${app.configs.url}`);
}

main();
