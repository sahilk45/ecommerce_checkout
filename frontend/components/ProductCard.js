'use client';
import { useState } from 'react';

export default function ProductCard({ product, onBuy }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variant || 'Red');
  const [quantity, setQuantity] = useState(1);

  const variants = ['Red', 'Blue', 'Black', 'White', 'Green'];
  
  const handleBuyNow = () => {
    onBuy(product, selectedVariant, quantity);
  };

  const getVariantColor = (variant) => {
    const colors = {
      'Red': 'bg-red-500',
      'Blue': 'bg-blue-500',
      'Black': 'bg-black',
      'White': 'bg-white border-2 border-gray-300',
      'Green': 'bg-green-500'
    };
    return colors[variant] || 'bg-gray-500';
  };

  return (
    <div className="glass-card-enhanced p-6 rounded-2xl shadow-2xl max-w-sm mx-auto group hover:shadow-3xl transition-all duration-500">
      {/* Product Image */}
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <img 
          src="/shoe.png" 
          alt={product.title || "Product"} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
          ${product.price}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
          {product.title || "Product Title"}
        </h2>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          {product.description || "Amazing product with great features"}
        </p>

        {/* Variant Selector */}
        <div>
          <label className="block text-gray-400 mb-2 font-medium">Color Variant</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedVariant === variant 
                    ? 'border-blue-400 ring-2 ring-blue-400 ring-opacity-50' 
                    : 'border-gray-600 hover:border-gray-400'
                } ${getVariantColor(variant)}`}
                title={variant}
              />
            ))}
          </div>
          <p className="text-sm text-blue-300 font-medium">Selected: {selectedVariant}</p>
        </div>

        {/* Quantity Selector */}
        <div>
          <label className="block text-gray-400 mb-2 font-medium">Quantity</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center font-bold transition-colors"
            >
              -
            </button>
            <span className="text-white font-bold text-lg min-w-[2rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-lg">
          <div className="flex justify-between items-center text-white">
            <span className="font-medium">Total:</span>
            <span className="text-xl font-bold">${(product.price * quantity).toFixed(2)}</span>
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
        >
          🛒 Buy Now
        </button>
      </div>
    </div>
  );
}