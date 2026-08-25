import Fuse from "fuse.js";
import { useEffect, useRef, useState, useMemo, type FormEvent } from "react";
import Card from "@components/Card";
import type { PostData } from "../types";

export type SearchItem = {
  title: string;
  description: string;
  data: PostData;
  href: string;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(
    null
  );

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = useMemo(
    () =>
      new Fuse(searchList, {
        keys: ["title", "description"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchList]
  );

  useEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    // Add search result only if
    // input value is more than one character
    const inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  }, [inputVal]);

  return (
    <>
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-chrome text-ui text-fg-muted">
          <span aria-hidden="true">/</span>
          <span className="sr-only">Search</span>
        </span>
        <input
          className="block w-full border border-line-strong bg-raised py-3 pl-8 pr-3 font-reading text-lead text-fg-strong placeholder:text-fg-muted focus:border-accent focus:outline-none"
          placeholder="search"
          type="text"
          name="search"
          value={inputVal}
          onChange={handleChange}
          autoComplete="off"
          // autoFocus
          ref={inputRef}
        />
      </label>

      {inputVal.length > 1 && (
        <p className="mt-3.5 font-chrome text-meta uppercase tracking-chrome text-fg-muted">
          {searchResults?.length ?? 0}
          {searchResults?.length === 1 ? " result" : " results"} for “{inputVal}
          ”
        </p>
      )}

      <ul className="mt-6 border-t border-line">
        {searchResults?.map(({ item, refIndex }) => (
          <Card
            href={item.href}
            frontmatter={item.data}
            tone={item.href.startsWith("/ai-radar/") ? "ai" : "site"}
            key={`${refIndex}-${item.href}`}
          />
        ))}
      </ul>
    </>
  );
}
