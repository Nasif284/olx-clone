import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, markProductsAsSold } from "../Redux/slices/productSlice";
    

const MyProducts = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.product);
  const user = useSelector((state) => state.auth.user);
  const [selectedProducts, setSelectedProducts] = useState([]);
    console.log(user)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let userProducts = products.filter((product) => product.userId === user?.uid);

  const handleSelect = (productId) => {
    setSelectedProducts((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
  };

  const handleMarkAsSold = () => {
    if (selectedProducts.length === 0) return;
    dispatch(markProductsAsSold(selectedProducts));
    setSelectedProducts([]);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {userProducts.length !== 0 && (
        <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50" onClick={handleMarkAsSold} disabled={selectedProducts.length === 0}>
          Mark Selected as Sold
        </button>
      )}

      {userProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {userProducts.map((product) => (
            <li key={product.id} className="border p-4 rounded-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm">{product.category}</p>
                <p className="text-sm">₹ {product.price}</p>
                <p className="text-sm">
                  Status: <span className={product.status === "sold" ? "text-red-500" : "text-green-600"}>{product.status || "available"}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                {product.imageUrl && <img src={product.imageUrl} alt={product.title} className="w-16 h-16 object-cover rounded-md" />}
                {product.status !== "sold" && <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => handleSelect(product.id)} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
