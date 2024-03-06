import React, { useState, useEffect } from 'react';
import useDebounce from './use-debounce';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  //хук возвращает поисковый запрос, но спустя 500 ms
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] //useEffect будет вызван, когда "отложенный" поисковый запрос изменится
  );

  // Довольно стандартный UI с полем поиска и результатами
  return (
    <div>
      <input placeholder="Search Marvel Comics" onChange={(e) => setSearchTerm(e.target.value)} />

      {isSearching && <div>Searching ...</div>}

      {results.map((result) => (
        <div key={result.id}>
          <h4>{result.title}</h4>
          <img src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`} />
        </div>
      ))}
    </div>
  );
}

// Функция поиска по АПИ
function searchCharacters(search) {
  const apiKey = 'f9dfb1e8d466d36c27850bedd2047687';
  const queryString = `apikey=${apiKey}&titleStartsWith=${search}`;
  return fetch(`https://gateway.marvel.com/v1/public/comics?${queryString}`, {
    method: 'GET',
  })
    .then((r) => r.json())
    .then((r) => r.data.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
}
