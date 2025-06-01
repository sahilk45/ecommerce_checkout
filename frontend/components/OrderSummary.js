export default function OrderSummary({ variant, quantity, onSubmit }) {
  const price = 70;
  const total = price * quantity;
  return (
    <div className="glass-card p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <p className="mb-1">Product: Converse Chuck Taylor</p>
      <p className="mb-1">Variant: {variant}</p>
      <p className="mb-1">Quantity: {quantity}</p>
      <p className="mb-1">Subtotal: ${price} x {quantity}</p>
      <p className="font-bold text-green-400">Total: ${total}</p>
      <button onClick={onSubmit} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Place Order</button>
    </div>
  );
}
