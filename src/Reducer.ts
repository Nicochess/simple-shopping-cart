import { Reducer } from "react"

export enum ActionKind {
  addToCart = "ADD_TO_CART",
  removeToCart = "REMOVE_TO_CART"
}

type Action = {
  type: ActionKind
  payload: any
}

const cartReducer: Reducer<CartItemType[], Action> = (state, action): CartItemType[] => {
  const { type, payload } = action
  switch (type) {
    case ActionKind.addToCart:
      const itemInCart = state.find(item => item.id === payload.id)
      if (itemInCart) {
        return state.map(item => item.id === payload.id ? { ...item, amount: item.amount + 1 } : item)
      }

      return [{ ...payload, amount: 1 }, ...state]

    case ActionKind.removeToCart:
      return state.reduce((acc, item) => {
        if (item.id === payload) {
          if (item.amount === 1) return acc

          return [...acc, { ...item, amount: item.amount - 1 }]
        }

        return [...acc, item]
      }, [] as CartItemType[])

    default:
      return state
  }
}

export default cartReducer