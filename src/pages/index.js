import React, { useState } from "react";

import { SearchForm, SearchResults, SEARCH_TYPE } from "../search";

export default function PlainTextPage() {
  const [term, setTerm] = useState("");

  return (
    <main>
      <SearchForm onTermChange={setTerm} term={term} />

      <h2>Partial Match</h2>
      <SearchResults term={term} type={SEARCH_TYPE.PARTIAL} />

      <h2>Fuzzy Full-text</h2>
      <SearchResults term={term} type={SEARCH_TYPE.FUZZY} />

      <h2>Semantic (AI)</h2>
      <SearchResults term={term} type={SEARCH_TYPE.SEMANTIC} />
    </main>
  );
}
