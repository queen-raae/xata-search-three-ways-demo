import { getXataClient } from "../../xata";

const xata = getXataClient();

export default async function handler(req, res) {
  const { term } = req.query;

  const results = await xata.search.all(term, {
    tables: [
      {
        table: "accounts",
        target: ["name", "username", "meta.description", "meta.location"],
      },
    ],
    fuzziness: 1,
    prefix: "phrase",
  });

  const enrichedResults = results.map((result) => {
    return {
      ...result,
      ...result.record.getMetadata(),
    };
  });

  res.json(enrichedResults);
}
