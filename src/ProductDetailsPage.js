import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { addToCart, updateCartQuantity } from "./reducers/actionTypes";

function ProductDetailsPage() {
  const { productId } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState(state?.product || null);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (!product) {
      fetchData();
    } else {
      const itemInCart = cartItems.find((item) => item.id === product.id);
      if (itemInCart) {
        setQuantity(itemInCart.quantity);
      }
    }
  }, []);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const itemInCart = cartItems.find((item) => item.id === product.id);
    if (itemInCart) {
      dispatch(updateCartQuantity(product.id, quantity));
    } else {
      dispatch(addToCart(product, quantity));
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      const data = await response.json();
      setProduct(data);
      const itemInCart = cartItems.find((item) => item.id === data.id);
      if (itemInCart) {
        setQuantity(itemInCart.quantity);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div
          style={{ display: "flex", justifyContent: "start", padding: "10px" }}
        ></div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1
            style={{
              color: "black",
              padding: "10px",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            Product Details
          </h1>
        </div>

        <div className="product-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : product ? (
            <div className="product-card">
              <Carousel indicators={false}>
                {product.images &&
                  product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="product-card"
                        style={{ width: "100%", height: "400px" }}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Discount: {product.discountPercentage}%</p>
              <p>Rating: {product.rating}</p>
              <p>Stock: {product.stock}</p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <div className="quantity-container" style={{ color: "black" }}>
                <label htmlFor="quantity">Quantity:</label>
                <div style={{ color: "black" }}>
                  <button
                    style={{ color: "black", backgroundColor: "transparent" }}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    style={{ color: "black", backgroundColor: "transparent" }}
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                {cartItems.some((item) => item.id === product?.id) ? (
                  <button
                    style={{
                      borderRadius: "5px",
                    }}
                    onClick={handleAddToCart}
                  >
                    Update Cart
                  </button>
                ) : (
                  <button
                    style={{
                      borderRadius: "5px",
                    }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              borderRadius: "5px",
            }}
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
