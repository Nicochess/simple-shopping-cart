import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, CircularProgress, Badge, Box } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Wrapper, StyledButton } from "./App.styles";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "Products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) => {
    const res = items.reduce((acc: number, item) => acc + item.amount, 0);
    return res;
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? {
                ...item,
                amount: item.amount + 1,
              }
            : item
        );
      }

      return [{ ...clickedItem, amount: 1 }, ...prev];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;

          return [...acc, { ...item, amount: item.amount - 1 }];
        }

        return [...acc, item];
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <ShoppingCart />
        </Badge>
      </StyledButton>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      >
        {data?.map((item: CartItemType) => (
          <Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
        ))}
      </Box>
    </Wrapper>
  );
};

export default App;
