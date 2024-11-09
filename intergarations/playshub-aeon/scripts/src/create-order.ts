import AeonService from "./aeon";
import { configDotenv } from "dotenv";

configDotenv();

const aeonService = new AeonService(
  "https://sbx-crypto-payment-api.aeon.xyz",
  process.env.SECRET_KEY as string,
  process.env.APP_ID as string
);

async function main() {
  await aeonService.create({
    amount: "1",
    orderNo: "10001",
  });
}

main();
