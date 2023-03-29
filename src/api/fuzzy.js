import { getXataClient } from "../../xata";

const xata = getXataClient();

export default async function handler(req, res) {
  const { term } = req.query;

  let results = await xata.search.all(term, {
    tables: [
      {
        table: "accounts",
        target: ["name", "username", "meta.description", "meta.location"],
      },
    ],
    page: { size: 20 },
    // fuzziness: 1,
    // prefix: "phrase",
  });

  results = results.map((result) => {
    const metadata = result.record.getMetadata();
    return {
      record: result.record,
      highlight: metadata.highlight,
    };
  });

  res.json(results);
}
