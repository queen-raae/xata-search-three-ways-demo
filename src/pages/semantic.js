import React, { useState } from "react";

import Search, { SEARCH_TYPE } from "../search";
import SearchForm from "../search/search-form";

export default function SemanticPage() {
  const [term, setTerm] = useState("");

  return (
    <main>
      <SearchForm onTermChange={setTerm} term={term} />
      <Search term={term} type={SEARCH_TYPE.SEMANTIC} />
    </main>
  );
}
