/**
 * Thinking in React
 * Building a searchable and filterable product table
 */

import { useState } from "react";

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterProductTable products={products} />;
}

function FilterProductTable({ products }) {
  const [searchString, setSearchString] = useState("");
  const [isStockedOnly, setIsStockedOnly] = useState(false);

  return (
    <>
      <Searchbar
        setSearchString={setSearchString}
        searchString={searchString}
        isStockedOnly={isStockedOnly}
        setIsStockedOnly={setIsStockedOnly}
      />
      <ProductTable
        products={products}
        searchString={searchString}
        isStockedOnly={isStockedOnly}
      />
    </>
  );
}

// All children elements

// Searchbar Child Component

function Searchbar({
  searchString,
  isStockedOnly,
  setSearchString,
  setIsStockedOnly,
}) {
  function handleInputSearchChange(e) {
    setSearchString(e.target.value);
  }

  function handleInputCheckboxChange(e) {
    setIsStockedOnly(e.target.checked);
  }

  return (
    <div>
      <input
        type="search"
        value={searchString}
        onChange={handleInputSearchChange}
        placeholder="Search products"
      />
      <label for="stocked-products-show">Only show products in stock</label>
      <input
        id="stocked-products-show"
        type="checkbox"
        value={isStockedOnly}
        onChange={handleInputCheckboxChange}
      />
    </div>
  );
}

/* ProductTable Child Component */

function ProductTable({ products, searchString, isStockedOnly }) {
  let productMap = {};
  let category = null;
  let filteredProducts = [];

  let searchRegex = new RegExp(searchString, "gi");

  console.log("Inside Products", searchString, isStockedOnly);

  if (isStockedOnly && searchString) {
    filteredProducts = products.filter((product) => {
      return (
        (searchRegex.test(product.name) ||
          searchRegex.test(product.category) ||
          searchRegex.test(product.price)) &&
        product.stocked
      );
    });
  } else if (isStockedOnly) {
    filteredProducts = products.filter((product) => {
      return product.stocked;
    });
  } else if (searchString) {
    filteredProducts = products.filter((product) => {
      return (
        searchRegex.test(product.name) ||
        searchRegex.test(product.category) ||
        searchRegex.test(product.price)
      );
    });
  } else {
    filteredProducts = Array.from(products);
  }

  filteredProducts.forEach((product, index) => {
    if (!productMap.hasOwnProperty(product.category)) {
      category = product.category;
      productMap[product.category] = [];
      productMap[product.category].push(product);
    } else {
      category = product.category;
      productMap[product.category].push(product);
    }
  });

  console.log("filteredProducts", filteredProducts);

  let categoriesList = Object.keys(productMap);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {categoriesList.map((category, index) => {
            return (
              <>
                <ProductCategory category={category} />

                {productMap[category].map((pr, index) => {
                  return (
                    <tr key={index}>
                      <ProductRow product={pr} />
                    </tr>
                  );
                })}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// ProductCatrgory Child Component

function ProductCategory({ category }) {
  return (
    <tr>
      <td>{category}</td>
      <td></td>
    </tr>
  );
}

// ProductRow Child Component

function ProductRow({ product }) {
  return (
    <>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </>
  );
}
