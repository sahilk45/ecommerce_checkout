'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleBuy = (product, selectedVariant, quantity) => {
    const params = new URLSearchParams({
      productId: product.id,
      variant: selectedVariant,
      quantity: quantity.toString(),
      title: product.title,
      price: product.price.toString()
    });
    router.push(`/checkout?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 animate-pulse">
            🛍️ eSalesOne
          </h1>
          <p className="text-xl text-blue-200">Discover Amazing Products</p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center text-white">
            <h2 className="text-2xl mb-4">No products available</h2>
            <p className="text-blue-200">Please check back later</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <div key={product.id || index} className="transform hover:scale-105 transition-all duration-300">
                <ProductCard
                  product={product}
                  onBuy={handleBuy}
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-blue-200">
          <p>&copy; 2025 eSalesOne. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}