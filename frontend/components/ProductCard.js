'use client';
import { useState } from 'react';

export default function ProductCard({ product, onBuy }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variant || 'Classic Red');
  const [quantity, setQuantity] = useState(1);

  // Available color options for Converse shoes
  const colorOptions = [
    { name: 'Classic Red', hex: '#DC2626', image: '/images/red-shoe.jpg' },
    { name: 'Ocean Blue', hex: '#2563EB', image: '/images/blue-shoe.jpg' },
    { name: 'Midnight Black', hex: '#1F2937', image: '/images/black-shoe.jpg' },
    { name: 'Pure White', hex: '#F9FAFB', image: '/images/white-shoe.jpg' },
    { name: 'Forest Green', hex: '#059669', image: '/images/green-shoe.jpg' },
    { name: 'Vintage Navy', hex: '#1E3A8A', image: '/images/navy-shoe.jpg' },
    { name: 'Bubblegum Pink', hex: '#EC4899', image: '/images/pink-shoe.jpg' },
    { name: 'Sunshine Yellow', hex: '#EAB308', image: '/images/yellow-shoe.jpg' },
    { name: 'Cream White', hex: '#FEF3C7', image: '/images/cream-shoe.jpg' },
    { name: 'Royal Purple', hex: '#7C3AED', image: '/images/purple-shoe.jpg' },
    { name: 'Charcoal Grey', hex: '#6B7280', image: '/images/grey-shoe.jpg' },
    { name: 'Premium Black Leather', hex: '#111827', image: '/images/leather-black-shoe.jpg' },
    { name: 'Electric Orange', hex: '#EA580C', image: '/images/orange-shoe.jpg' },
    { name: 'Mint Fresh', hex: '#10B981', image: '/images/mint-shoe.jpg' },
    { name: 'Vintage Brown Leather', hex: '#92400E', image: '/images/brown-leather-shoe.jpg' },
    { name: 'Wine Burgundy', hex: '#991B1B', image: '/images/burgundy-shoe.jpg' }
  ];

  const handleBuyNow = () => {
    onBuy(product, selectedVariant, quantity);
  };

  // Get current selected color info
  const currentColor = colorOptions.find(color => color.name === selectedVariant) || colorOptions[0];

  // Get stock status
  const getStockStatus = () => {
    if (product.inventory > 20) return { text: 'In Stock', color: 'text-green-400' };
    if (product.inventory > 5) return { text: 'Low Stock', color: 'text-yellow-400' };
    if (product.inventory > 0) return { text: 'Very Low Stock', color: 'text-orange-400' };
    return { text: 'Out of Stock', color: 'text-red-400' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img 
          src={currentColor.image} 
          alt={`${product.title} - ${selectedVariant}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to placeholder if image doesn't exist
            e.target.src = `https://via.placeholder.com/400x300/6B7280/FFFFFF?text=${encodeURIComponent(selectedVariant)}`;
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>
        {product.inventory <= 5 && product.inventory > 0 && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Only {product.inventory} left!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-gray-300" 
              style={{ backgroundColor: currentColor.hex }}
            ></div>
            <span className="text-gray-600 text-sm">{selectedVariant}</span>
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Choose Color:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.slice(0, 8).map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedVariant(color.name)}
                className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                  selectedVariant === color.name 
                    ? 'border-blue-500 scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedVariant === color.name && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          {colorOptions.length > 8 && (
            <p className="text-xs text-gray-500">+{colorOptions.length - 8} more colors available</p>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors font-semibold"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="w-12 text-center text-gray-900 font-semibold bg-gray-50 py-2 rounded-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors font-semibold"
              disabled={quantity >= product.inventory}
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Total:</span>
            <span className="text-xl font-bold text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={product.inventory === 0}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
            product.inventory === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}