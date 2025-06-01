'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleBuy = () => {
    const selectedProduct = products[selectedIndex];
    router.push(`/checkout?variant=${selectedProduct.variant}&quantity=${quantity}`);
  };

  if (products.length === 0) return <div className="text-white text-center mt-10">Loading product...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black p-6">
      <h1 className="text-3xl text-white text-center font-bold mb-8">🛍️ Welcome to eSalesOne</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {products.map((product, index) => (
          <div key={index} className={selectedIndex === index ? 'ring-2 ring-green-400 rounded-xl' : ''}>
            <ProductCard
              product={product}
              variant={product.variant}
              setVariant={() => setSelectedIndex(index)}
              quantity={quantity}
              setQuantity={setQuantity}
              onBuy={handleBuy}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
