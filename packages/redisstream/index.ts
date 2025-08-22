import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

type WebsiteEvent = { url: string; id: string };
type MessageType = {
  id: string;
  message: {
    url: string;
    id: string;
  };
};

const xAdd = async ({ url, id }: WebsiteEvent) => {
  await client.xAdd("betteruptime:website", "*", {
    url: url,
    id: id,
  });
};

export const xAddBulk = async (website: WebsiteEvent[]) => {
  for (let i = 0; i < website.length; i++) {
    await xAdd({ url: website[i]?.url!, id: website[i]?.id! });
  }
};

export const xReadGroup = async (
  consumerGroup: string,
  workerId: string
): Promise<MessageType[]> => {
  const res = await client.xReadGroup(
    consumerGroup,
    workerId,
    {
      key: "betteruptime:website",
      id: ">",
    },
    {
      COUNT: 5,
    }
  );
  // @ts-ignore
  let messages: MessageType[] = res[0].messages;
  return messages;
};

export const xAck = async (consumerGroup: string, streamId: string) => {
  await client.xAck("betteruptime:website", consumerGroup, streamId);
};
