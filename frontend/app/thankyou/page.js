import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ThankYou() {
  const router = useRouter();
  const { orderNum } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderNum) {
      axios.get(`http://localhost:4000/api/order/${orderNum}`).then((res) => {
        setOrder(res.data);
      });
    }
  }, [orderNum]);

  if (!order) return <p className="text-white text-center mt-10">Loading order details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6 flex flex-col items-center">
      <div className="glass-card p-6 rounded-2xl shadow-xl w-full max-w-2xl mt-8">
        <h1 className="text-3xl font-bold text-green-400 mb-4">🎉 Order Confirmed!</h1>
        <p className="text-lg mb-2">Order Number: <span className="font-mono">{order.order_number}</span></p>
        <p className="mb-2">Status: <span className="capitalize">{order.status}</span></p>
        <hr className="my-4 border-gray-700" />
        <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
        <p>{order.name}, {order.email}</p>
        <p>{order.phone}</p>
        <p>{order.address}, {order.city}, {order.state}, {order.zip}</p>
        <hr className="my-4 border-gray-700" />
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p>Variant: {order.variant}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Card Ending: ****{order.card_last4}</p>
        <p className="mt-4 text-green-400">Thank you for your purchase!</p>
      </div>
    </div>
  );
}