import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_CART } from "./reducers/actionTypes";

interface RootState {
  cart: {
    items: Product[];
  };
}

interface Product {
  id: string;
  title: string;
  thumbnail: string;
  quantity: number;
  price: number;
}

const Layout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleRemoveFromCart = (id: string) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { productId: id } });
  };

  return (
    <div>
      <header>
        <div className="header9">
          <nav>
            <Link
              to="/home"
              style={{
                color: "black",
                textDecoration: "none",
                paddingRight: "10px",
                fontWeight: "bold",
              }}
            >
              HomePage
            </Link>

            {location.pathname !== "/products" && (
              <Link
                to="/products"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                ProductList
              </Link>
            )}

            <div
              className="cart-container"
              style={{ display: "inline-block", position: "relative" }}
            >
              <Link
                to="/cart"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Cart ({cartItems.length})
              </Link>
              <div className="cart-details">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <Link to={`/cart/`}>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="cart-thumbnail"
                        />
                      </Link>
                      <div className="cart-info">
                        <p>{item.title}</p>
                        <p style={{ fontWeight: "bold" }}>
                          Quantity: {item.quantity}
                        </p>
                        <p>Price: ${item.price}</p>
                        <button
                          style={{
                            backgroundColor: "black",
                            borderRadius: "5px",
                            color: "white",
                            padding: "5px 10px",
                          }}
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-cart">Cart is empty😕</p>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
