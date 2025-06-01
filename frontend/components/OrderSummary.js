export default function OrderSummary({ product, onSubmit, loading }) {
  const subtotal = product.price * product.quantity;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = 5.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="sticky top-6">
      <div className="glass-card-enhanced p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
          📋 Order Summary
        </h2>
        
        {/* Product Info */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <img 
              src="/shoe.png" 
              alt="Product" 
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-white font-medium">{product.title}</h3>
              <p className="text-gray-300 text-sm">Color: {product.variant}</p>
              <p className="text-gray-300 text-sm">Quantity: {product.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-300">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Shipping:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <hr className="border-gray-600" />
          <div className="flex justify-between text-white text-xl font-bold">
            <span>Total:</span>
            <span className="text-green-400">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-2 text-green-400 text-sm">
            <span>🔒</span>
            <span>SSL Encrypted • Secure Payment</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button 
          onClick={onSubmit}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
            loading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 hover:scale-105 hover:shadow-lg'
          } text-white focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            '🚀 Place Order'
          )}
        </button>

        {/* Payment Methods */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm mb-2">We accept:</p>
          <div className="flex justify-center space-x-2 text-2xl">
            <span>💳</span>
            <span>💰</span>
            <span>🏦</span>
          </div>
        </div>
      </div>
    </div>
  );
}