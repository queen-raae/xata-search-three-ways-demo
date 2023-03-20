import { contains } from "@xata.io/client";
import { getXataClient } from "../../xata";

const xata = getXataClient();

export default async function handler(req, res) {
  const { term } = req.query;

  const { accounts } = xata.db;

  const records = await accounts
    .any(
      accounts.filter("name", contains(term)),
      accounts.filter("username", contains(term)),
      accounts.filter("meta.description", contains(term)),
      accounts.filter("meta.location", contains(term))
    )
    .getMany({ pagination: { size: 40 } });

  const enrichedResults = records.map((record) => {
    return {
      record: record,
    };
  });

  res.json(enrichedResults);
}
