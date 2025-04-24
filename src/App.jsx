import './App.css'
import { useState, useEffect, useCallback } from "react"

const debounce = (callback, delay) => {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  console.log(query);
  console.log(products);

  const eseguiFetch = useCallback(debounce((query) => {
    fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, 1000), [])

  useEffect(() => {
    eseguiFetch(query)
  }, [query])

  return (
    <>
      <div className="search-container">
        {/* Search bar */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca..."
        />

        {/* Dropdown */}
        {query && products.length > 0 && (
          <ul className="dropdown">
            {products.map((p) => (
              <li key={p.id}>&#128269; {p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App