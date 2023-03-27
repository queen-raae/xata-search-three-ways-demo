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
    .getMany({ pagination: { size: 20 } });

  const enrichedResults = records.map((record) => {
    const highlight = (match) => `<em>${match}</em>`;
    return {
      record: record,
      highlight: {
        name: record.name?.replace(term, highlight),
        username: record.username?.replace(term, highlight),
        meta: {
          description: record.meta.description?.replace(term, highlight),
          location: record.meta.location?.replace(term, highlight),
        },
      },
    };
  });

  res.json(enrichedResults);
}
