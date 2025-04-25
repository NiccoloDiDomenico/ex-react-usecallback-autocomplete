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
  const [productDetails, setProductDetails] = useState(null);

  const getSearchedProducts = useCallback(debounce(async (query) => {
    if (!query) {
      return
    }
    try {
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`);
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }, 1000), [])

  useEffect(() => {
    getSearchedProducts(query)
  }, [query])

  const handleProductDetails = (id) => {
    setProducts([]);
    fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProductDetails(data))
      .catch((error) => console.error(error))
  }

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
              <li
                key={p.id}
                onClick={() => handleProductDetails(p.id)}>
                &#128269; {p.name}
              </li>
            ))}
          </ul>
        )}
      </div >

      {/* Product details */}
      {productDetails && (
        <div className="card">
          <div className="card-header">
            <img src={productDetails.image} alt="" />
          </div>
          <div className="card-body">
            <h3>{productDetails.name}</h3>
            <p>{productDetails.brand}</p>
            <p>{productDetails.description}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App