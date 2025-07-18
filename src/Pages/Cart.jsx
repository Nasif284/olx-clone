import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../Redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-4 w-full justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-contain" />
                    <div>
                      <h2 className="font-semibold">{item.title}</h2>
                      <p>₹ {item.price}</p>
                    </div>
                  </div>

                  <div>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="px-2 text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">Total: ₹ {total}</h3>
            <div className="flex gap-5">
              <button onClick={() => dispatch(clearCart())} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Clear Cart
              </button>
              <button onClick={() => dispatch(clearCart())} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
