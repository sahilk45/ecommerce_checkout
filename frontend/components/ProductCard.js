export default function ProductCard({ product, variant, setVariant, quantity, setQuantity, onBuy }) {
  return (
    <div className="glass-card p-6 rounded-2xl shadow-xl max-w-md mx-auto">
      <img src="/shoe.png" alt="product" className="rounded mb-4" />
      <h2 className="text-xl font-bold text-white">{product.title}</h2>
      <p className="text-gray-300 mb-2">{product.description}</p>
      <p className="text-green-400 font-semibold mb-4">${product.price}</p>
      <label className="block text-gray-400 mb-1">Variant</label>
      <select value={variant} onChange={(e) => setVariant(e.target.value)} className="mb-4 p-2 w-full rounded bg-gray-800 border border-gray-600 text-white">
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Black">Black</option>
      </select>
      <label className="block text-gray-400 mb-1">Quantity</label>
      <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mb-4 p-2 w-full rounded bg-gray-800 border border-gray-600 text-white" />
      <button onClick={onBuy} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full">Buy Now</button>
    </div>
  );
}