import axios from "axios";
import { xAck, xReadGroup } from "redisstream/client";
import client from "store/client";

const region = process.env.REGION!;
const workerId = process.env.WORKER_ID!;

//TODO: Check also if websites really exists in our database.

if (!region) {
  throw new Error("Region not acessible");
}

if (!workerId) {
  throw new Error("WorkerId not acessible");
}

async function main() {
  const messages = await xReadGroup(region, workerId);

  const promises = messages.map(({ message }) =>
    fetchWebsite(message.url, message.id)
  );
  await Promise.all(promises);

  xAck(region, "a");
}

async function fetchWebsite(url: string, websiteId: string) {
  return new Promise<void>((resolve) => {
    const startTime = Date.now();
    axios
      .get(url)
      .then(async () => {
        const totalTime = Date.now() - startTime;
        await client.websiteTick.create({
          data: {
            response_time_ms: totalTime,
            status: "Up",
            region_id: region,
            website_id: websiteId,
          },
        });
        resolve();
      })
      .catch(async () => {
        const totalTime = Date.now() - startTime;
        await client.websiteTick.create({
          data: {
            response_time_ms: totalTime,
            status: "Down",
            region_id: region,
            website_id: websiteId,
          },
        });
        resolve();
      });
  });
}

main();
