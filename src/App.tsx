import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, CircularProgress, Grid } from "@mui/material";
import { AddShoppingCart, Badge } from "@mui/icons-material";
import Item from "./Item/Item";
import { Wrapper } from "./App.styles";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

const App = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "Products",
    getProducts
  );

  const getTotalItems = () => {};

  const handleAddToCart = (clickedItem: CartItemType) => {};

  const handleRemoveFromCart = () => {};

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        Cart goes here
      </Drawer>

      <Grid container spacing={3}>
        {data?.map((item: CartItemType) =>(
          <Grid key={item.id} item xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

    </Wrapper>
  );
};

export default App;
