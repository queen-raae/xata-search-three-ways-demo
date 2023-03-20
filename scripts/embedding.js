import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import { notExists } from "@xata.io/client";
import { getXataClient } from "../xata.js";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAI = new OpenAIApi(openAIConfig);

const xata = getXataClient();

const getEmbedding = async (input) => {
  const response = await openAI.createEmbedding({
    input: input,
    model: "text-embedding-ada-002",
  });
  const [{ embedding }] = response.data.data;
  return embedding;
};

const transformRecord = async (record) => {
  const input = `Name: ${record.name}; Username: ${record.username}; Location: ${record.meta.location}; Description: ${record.meta.description}; Followers: ${record.public_metrics.followers_count}; Following: ${record.public_metrics.following_count};`;
  console.log({ input });
  const embedding = await getEmbedding(input);
  return {
    id: record.id,
    embedding: embedding,
  };
};

const updateRecords = async (records) => {
  console.log("Update records ", records.length);
  const transformPromises = records.map(
    async (record) => await transformRecord(record)
  );
  const transformedRecords = await Promise.all(transformPromises);
  const updatedRecords = await xata.db.accounts.update(transformedRecords);
  console.log("Updated records", updatedRecords.length);
  return updatedRecords;
};

let page = await xata.db.accounts
  .filter(notExists("embedding"))
  .select([
    "id",
    "meta.location",
    "meta.description",
    "name",
    "username",
    "public_metrics.followers_count",
    "public_metrics.following_count",
  ])
  .getPaginated({
    pagination: {
      size: 20,
    },
  });

// await updateRecords(page.records);

do {
  await updateRecords(page.records);

  if (page.hasNextPage()) {
    page = await page.nextPage();
  } else {
    page = null;
  }
} while (page);
