import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="background">
      <div className="header1">
        <h1>Product List</h1>
        <p>To visit each and every product details click on below links</p>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.thumbnail}
              className="card-img-top"
              alt={product.title}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <button onClick={() => handleViewDetails(product)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
