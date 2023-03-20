import React from "react";
import useSearch from "./useSearch";

export { SEARCH_TYPE } from "./useSearch";

export default function SearchResults({ term, type }) {
  const { data: results, isSuccess, isFetching } = useSearch({ term, type });

  return (
    <ul className={isFetching ? "loading" : ""}>
      {isSuccess && results.length === 0 && (
        <li key="empty">
          <p>No results</p>
        </li>
      )}

      {(results || []).map(({ record, highlight }) => {
        return (
          <li key={record.username}>
            <a href={`http://twitter.com/${record.username}`}>
              <img
                src={record.meta.profile_image_url}
                aria-hidden={true}
                alt={`Avatar for ${record.username}`}
              />
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight?.name || record.name,
                }}
              />
              <br />
              @
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight?.username || record.username,
                }}
              />
              <hr />
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    highlight?.meta?.description || record.meta.description,
                }}
              />
              {record.meta.location && (
                <p>
                  <strong>Location: </strong>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlight?.meta?.location || record.meta.location,
                    }}
                  />
                </p>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
