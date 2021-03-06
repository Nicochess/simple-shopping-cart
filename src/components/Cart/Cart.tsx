import React from "react";
import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";

type Props = {
  cartItems: CartItem[];
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItem[]) =>
    items.reduce((acc: number, item) => acc + item.price * item.amount, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p>No items in the cart.</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
