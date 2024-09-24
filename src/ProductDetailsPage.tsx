import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState<Product | null>(
    state?.product || null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!product) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h1>Product Details</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : product ? (
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Discount: {product.discountPercentage}%</p>
              <p>Rating: {product.rating}</p>
              <p>Stock: {product.stock}</p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
