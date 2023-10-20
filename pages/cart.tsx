import { useSelector, useDispatch } from "react-redux"
import { getItemsInCart, setItemsInCart } from "@/store/cart-slice"

export default function Cart() {
  const itemsInCart: any = useSelector(getItemsInCart)
  const dispatch = useDispatch()

  const addItemsToCart = () => {
    dispatch(setItemsInCart(parseInt(itemsInCart) + 1))
  }

  return (
    <>
      <h2>Items in Cart : {itemsInCart}</h2>
      <button value="Add" type="button" onClick={addItemsToCart}>
        Add
      </button>
    </>
  )
}
