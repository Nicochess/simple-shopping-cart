import React, { useReducer } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, CircularProgress, Badge, Box } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
import cartReducer, { ActionKind } from "./Reducer";

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer(cartReducer, []);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "Products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) => {
    const res = items.reduce((acc: number, item) => acc + item.amount, 0);
    return res;
  };

  const addToCart = (item: CartItemType) => {
    dispatch({ type: ActionKind.addToCart, payload: item });
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: ActionKind.removeToCart, payload: id })
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={state}
          addToCart={addToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(state)} color="error">
          <ShoppingCart />
        </Badge>
      </StyledButton>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      >
        {data?.map((item: CartItemType) => (
          <Item key={item.id} item={item} handleAddToCart={addToCart} />
        ))}
      </Box>
    </Wrapper>
  );
};

export default App;
