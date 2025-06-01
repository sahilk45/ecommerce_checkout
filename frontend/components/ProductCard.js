'use client';
import { useState } from 'react';

export default function ProductCard({ product, onBuy }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variant || 'Classic Red');
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    onBuy(product, selectedVariant, quantity);
  };

  // Get color class based on variant name
  const getVariantColorClass = (variant) => {
    const colorMap = {
      'Classic Red': 'bg-red-500',
      'Ocean Blue': 'bg-blue-500',
      'Midnight Black': 'bg-gray-900',
      'Pure White': 'bg-gray-100 border border-gray-300',
      'Forest Green': 'bg-green-600',
      'Vintage Navy': 'bg-blue-900',
      'Bubblegum Pink': 'bg-pink-400',
      'Sunshine Yellow': 'bg-yellow-400',
      'Cream White': 'bg-yellow-100 border border-gray-300',
      'Royal Purple': 'bg-purple-600',
      'Charcoal Grey': 'bg-gray-600',
      'Premium Black Leather': 'bg-gray-900',
      'Electric Orange': 'bg-orange-500',
      'Mint Fresh': 'bg-green-300',
      'Vintage Brown Leather': 'bg-yellow-800',
      'Wine Burgundy': 'bg-red-800'
    };
    return colorMap[variant] || 'bg-gray-500';
  };

  // Get stock status
  const getStockStatus = () => {
    if (product.inventory > 20) return { text: 'In Stock', color: 'text-green-400' };
    if (product.inventory > 5) return { text: 'Low Stock', color: 'text-yellow-400' };
    if (product.inventory > 0) return { text: 'Very Low Stock', color: 'text-orange-400' };
    return { text: 'Out of Stock', color: 'text-red-400' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="glass-card-enhanced p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group">
      {/* Product Image Placeholder */}
      <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <div className="text-6xl animate-float">👟</div>
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
          <span className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>
        {product.inventory <= 5 && product.inventory > 0 && (
          <div className="absolute bottom-3 left-3 bg-yellow-500/90 text-black text-xs font-bold px-2 py-1 rounded-full">
            Only {product.inventory} left!
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-400">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${getVariantColorClass(product.variant)}`}></div>
            <span className="text-gray-400 text-sm">{product.variant}</span>
          </div>
        </div>

        {/* Variant Display (showing current variant) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Selected Variant:
          </label>
          <div className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${getVariantColorClass(selectedVariant)}`}></div>
            <span className="text-white text-sm">{selectedVariant}</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Quantity:
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="w-8 text-center text-white font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
              disabled={quantity >= product.inventory}
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total:</span>
            <span className="text-xl font-bold text-green-400">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={product.inventory === 0}
          className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
            product.inventory === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg animate-pulse-glow'
          }`}
        >
          {product.inventory === 0 ? '😔 Out of Stock' : '🛒 Buy Now'}
        </button>
      </div>
    </div>
  );
}