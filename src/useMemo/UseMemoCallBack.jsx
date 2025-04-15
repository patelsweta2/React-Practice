import React, { useState, useCallback, useMemo } from "react";

const ProductItem = React.memo(({ product, onAddToCart }) => {
  console.log("Rendering: ", product.name);
  return (
    <div>
      <p>{product.name}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
});

const UseMemoCallBack = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, name: "iphone" },
    { id: 2, name: "Samsung" },
    { id: 3, name: "OnePlus" },
    { id: 4, name: "Redmi" },
    { id: 5, name: "Pixel" },
  ];
  const filteredProducts = useMemo(() => {
    console.log("filtered Products...");
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleAddToCart = useCallback((productId) => {
    setCart((prev) => [...prev, productId]);
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="Search Products.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h3>Products:</h3>
      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
      <h3>Cart Items: {cart.length}</h3>
    </div>
  );
};

export default UseMemoCallBack;
