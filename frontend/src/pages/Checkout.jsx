// import React, { useState } from "react";
// import { placeOrder } from "../services/orderService";
// import Button from "../components/ui/Button";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = {
//       address: e.target.address.value,
//       paymentMethod: e.target.paymentMethod.value,
//     };
//     await placeOrder(formData);
//     setLoading(false);
//     navigate("/orders");
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
//       <form onSubmit={handleCheckout} className="space-y-4">
//         <textarea
//           name="address"
//           placeholder="Delivery Address"
//           className="w-full border p-2 rounded"
//           required
//         />
//         <select
//           name="paymentMethod"
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="COD">Cash on Delivery</option>
//           <option value="Card">Credit/Debit Card</option>
//         </select>
//         <Button type="submit" className="w-full" disabled={loading}>
//           {loading ? "Placing Order..." : "Place Order"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from "react";
import API from "../utils/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleOrder = async () => {
    const items = cart.map(c => ({ product: c._id, qty: 1 }));
    await API.post("/orders", { items, address });
    clearCart();
    navigate("/orders");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <textarea
        placeholder="Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border w-full p-3 mb-4 rounded"
      />
      <button
        onClick={handleOrder}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
