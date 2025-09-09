// import React, { useEffect, useState } from "react";
// import {
//   getCart,
//   updateCartItem,
//   removeCartItem,
//   clearCart,
// } from "../services/cartService";
// import { Link } from "react-router-dom";
// import Button from "../components/ui/Button";

// const Cart = () => {
//   const [cart, setCart] = useState(null);

//   const fetchCart = async () => {
//     const { data } = await getCart();
//     setCart(data);
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleQtyChange = async (itemId, qty) => {
//     await updateCartItem(itemId, qty);
//     fetchCart();
//   };

//   const handleRemove = async (itemId) => {
//     await removeCartItem(itemId);
//     fetchCart();
//   };

//   const handleClear = async () => {
//     await clearCart();
//     fetchCart();
//   };

//   if (!cart) return <p className="p-6">Loading cart...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

//       {cart.items.length === 0 ? (
//         <p>
//           Your cart is empty. <Link to="/">Continue Shopping</Link>
//         </p>
//       ) : (
//         <>
//           <table className="w-full border-collapse border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Product</th>
//                 <th className="border p-2">Price</th>
//                 <th className="border p-2">Qty</th>
//                 <th className="border p-2">Total</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.items.map((item) => (
//                 <tr key={item._id} className="text-center">
//                   <td className="border p-2">{item.product.name}</td>
//                   <td className="border p-2">${item.product.price}</td>
//                   <td className="border p-2">
//                     <input
//                       type="number"
//                       value={item.qty}
//                       min="1"
//                       className="w-16 border p-1 text-center"
//                       onChange={(e) =>
//                         handleQtyChange(item._id, Number(e.target.value))
//                       }
//                     />
//                   </td>
//                   <td className="border p-2">
//                     ${(item.product.price * item.qty).toFixed(2)}
//                   </td>
//                   <td className="border p-2">
//                     <Button
//                       variant="danger"
//                       onClick={() => handleRemove(item._id)}
//                     >
//                       Remove
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="mt-6 flex justify-between items-center">
//             <Button variant="secondary" onClick={handleClear}>
//               Clear Cart
//             </Button>
//             <div className="text-right">
//               <p className="text-lg font-semibold">
//                 Subtotal: ${cart.total.toFixed(2)}
//               </p>
//               <Link to="/checkout">
//                 <Button className="mt-2">Proceed to Checkout</Button>
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart.length) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center border p-4 rounded">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>${item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <Link to="/checkout" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
