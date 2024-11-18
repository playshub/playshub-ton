import axios from "axios";

async function main() {
  try {
    const response = await axios.post("http://playshub.io:8082/check-in", {
      account_id: "test",
    });
    console.log(response);
  } catch (e: any) {
    console.debug(e);
    console.debug(`Status: ${e.status}, Message: ${e.statusText || e.message}`);
  }
}

main();
