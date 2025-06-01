'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ThankYou() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum');
  const status = searchParams.get('status');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNum) {
      fetch(`http://localhost:4000/api/order/${orderNum}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
          setLoading(false);
        });
    }
  }, [orderNum]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="glass-card-enhanced p-8 rounded-2xl text-center">
          <h1 className="text-2xl text-white mb-4">Order Not Found</h1>
          <p className="text-gray-300 mb-6">We couldn't find your order details.</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isSuccessful = order.status === 'approved';
  const getStatusIcon = () => {
    switch (order.status) {
      case 'approved': return '✅';
      case 'declined': return '❌';
      case 'error': return '⚠️';
      default: return '📦';
    }
  };

  const getStatusMessage = () => {
    switch (order.status) {
      case 'approved': return 'Your order has been confirmed!';
      case 'declined': return 'Your payment was declined.';
      case 'error': return 'There was an error processing your payment.';
      default: return 'Order processed.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{getStatusIcon()}</div>
          <h1 className={`text-4xl font-bold mb-2 ${isSuccessful ? 'text-green-400' : 'text-red-400'}`}>
            {isSuccessful ? 'Order Confirmed!' : 'Order Failed'}
          </h1>
          <p className="text-xl text-blue-200">{getStatusMessage()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="glass-card-enhanced p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
              📋 Order Details
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Order Number</p>
                <p className="text-white font-mono text-lg">{order.order_number}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Status</p>
                <p className={`font-semibold capitalize text-lg ${
                  order.status === 'approved' ? 'text-green-400' : 
                  order.status === 'declined' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {order.status}
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Product</p>
                <p className="text-white">Converse Chuck Taylor All Star</p>
                <p className="text-gray-300 text-sm">Variant: {order.variant}</p>
                <p className="text-gray-300 text-sm">Quantity: {order.quantity}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Payment Method</p>
                <p className="text-white">Card ending in ****{order.card_last4}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="glass-card-enhanced p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
              👤 Customer Information
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white text-lg">{order.name}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white">{order.email}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white">{order.phone}</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Shipping Address</p>
                <p className="text-white">
                  {order.address}<br />
                  {order.city}, {order.state} {order.zip}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-8 space-y-4">
          {isSuccessful ? (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-green-400 text-xl font-semibold mb-2">
                🎉 Thank you for your purchase!
              </h3>
              <p className="text-green-300 mb-4">
                A confirmation email has been sent to {order.email}
              </p>
              <p className="text-gray-300 text-sm">
                Your order will be processed and shipped within 2-3 business days.
              </p>
            </div>
          ) : (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-red-400 text-xl font-semibold mb-2">
                Payment Failed
              </h3>
              <p className="text-red-300 mb-4">
                Don't worry! Your order information has been saved.
              </p>
              <Link 
                href="/checkout" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Try Again
              </Link>
            </div>
          )}
          
          <div className="flex justify-center space-x-4 mt-6">
            <Link 
              href="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🏠 Continue Shopping
            </Link>
            
            {isSuccessful && (
              <button 
                onClick={() => window.print()} 
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                🖨️ Print Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}