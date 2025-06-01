export default function OrderSummary({ product, onSubmit, loading }) {
  const subtotal = product.price * product.quantity;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 100 ? 0 : 5.99; // Free shipping over $100
  const total = subtotal + tax + shipping;

  // Get product image based on variant
  const getProductImage = (variant) => {
    const imageMap = {
      'Classic Red': '/images/red-shoe.jpg',
      'Ocean Blue': '/images/blue-shoe.jpg',
      'Midnight Black': '/images/black-shoe.jpg',
      'Pure White': '/images/white-shoe.jpg',
      'Forest Green': '/images/green-shoe.jpg',
      'Vintage Navy': '/images/navy-shoe.jpg',
      'Bubblegum Pink': '/images/pink-shoe.jpg',
      'Sunshine Yellow': '/images/yellow-shoe.jpg',
      'Cream White': '/images/cream-shoe.jpg',
      'Royal Purple': '/images/purple-shoe.jpg',
      'Charcoal Grey': '/images/grey-shoe.jpg',
      'Premium Black Leather': '/images/leather-black-shoe.jpg',
      'Electric Orange': '/images/orange-shoe.jpg',
      'Mint Fresh': '/images/mint-shoe.jpg',
      'Vintage Brown Leather': '/images/brown-leather-shoe.jpg',
      'Wine Burgundy': '/images/burgundy-shoe.jpg'
    };
    return imageMap[variant] || `https://via.placeholder.com/400x300/6B7280/FFFFFF?text=${encodeURIComponent(variant)}`;
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Order Summary
          </h2>
        </div>
        
        <div className="p-6">
          {/* Product Info */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <img 
                src={getProductImage(product.variant)} 
                alt={`${product.title} - ${product.variant}`}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/80x80/6B7280/FFFFFF?text=Shoe`;
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{product.title}</h3>
                <p className="text-gray-600 text-sm">Color: {product.variant}</p>
                <p className="text-gray-600 text-sm">Quantity: {product.quantity}</p>
                <p className="text-gray-900 font-semibold text-sm">${product.price.toFixed(2)} each</p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-medium">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {subtotal < 100 && (
              <div className="text-xs text-gray-500 italic">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </div>
            )}
            <hr className="border-gray-300" />
            <div className="flex justify-between text-gray-900 text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
            <div className="flex items-center space-x-2 text-green-700 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">256-bit SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2 text-green-700 text-sm mt-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Secure Payment Processing</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button 
            onClick={onSubmit}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Complete Purchase
              </>
            )}
          </button>

          {/* Payment Methods */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm text-center mb-2">We accept:</p>
            <div className="flex justify-center space-x-3">
              <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium text-gray-600">VISA</div>
              <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium text-gray-600">MC</div>
              <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium text-gray-600">AMEX</div>
              <div className="bg-gray-100 rounded px-2 py-1 text-xs font-medium text-gray-600">PAYPAL</div>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center text-gray-600 text-xs">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}