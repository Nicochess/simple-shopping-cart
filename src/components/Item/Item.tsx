import React from "react";
import { Button } from "@mui/material";
import { Wrapper } from "./Item.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
        <p>Stock: {item.rating.count}</p>
      </div>
      <Button variant="contained" onClick={() => handleAddToCart(item)}>
        Add to Cart
      </Button>
    </Wrapper>
  );
};

export default Item;
