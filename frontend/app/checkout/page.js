'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CheckoutForm from '../../components/CheckoutForm';
import OrderSummary from '../../components/OrderSummary';

export default function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Get product details from URL params
  const productDetails = {
    id: searchParams.get('productId'),
    title: searchParams.get('title') || 'Converse Chuck Taylor All Star',
    variant: searchParams.get('variant') || 'Red',
    quantity: parseInt(searchParams.get('quantity')) || 1,
    price: parseFloat(searchParams.get('price')) || 70.00
  };

  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvv: '',
    simulationCode: '1'
  });

  const handleCustomerChange = (e) => {
    setCustomerForm({
      ...customerForm,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleCardChange = (e) => {
    let value = e.target.value;

    // Format card number with spaces
    if (e.target.name === 'number') {
      value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      if (value.replace(/\s/g, '').length > 16) return;
    }

    // Format expiry date
    if (e.target.name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      if (value.length > 5) return;
    }

    // Format CVV
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) return;
    }

    setCardForm({
      ...cardForm,
      [e.target.name]: value
    });

    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer validation
    if (!customerForm.name.trim()) newErrors.name = 'Full name is required';
    if (!customerForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerForm.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!customerForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(customerForm.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    if (!customerForm.address.trim()) newErrors.address = 'Address is required';
    if (!customerForm.city.trim()) newErrors.city = 'City is required';
    if (!customerForm.state.trim()) newErrors.state = 'State is required';
    if (!customerForm.zip.trim()) newErrors.zip = 'Zip code is required';

    // Card validation
    const cardNumber = cardForm.number.replace(/\s/g, '');
    if (!cardNumber) {
      newErrors.number = 'Card number is required';
    } else if (cardNumber.length !== 16) {
      newErrors.number = 'Card number must be 16 digits';
    }

    if (!cardForm.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else {
      const [month, year] = cardForm.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (!month || !year || month < 1 || month > 12) {
        newErrors.expiry = 'Invalid expiry date format';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }

    if (!cardForm.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardForm.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerForm,
          card: {
            ...cardForm,
            number: cardForm.number.replace(/\s/g, '')
          },
          product: productDetails
        }),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(`/thankyou?orderNum=${result.orderNumber}&status=${result.status}`);
      } else {
        throw new Error(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`There was an error processing your order: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center text-blue-600">
              <div className="w-8 h-8 bg-blue-600 text-black rounded-full flex items-center justify-center text-sm font-semibold mr-2">1</div>
              <span className="font-medium">Shipping & Payment</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="flex items-center text-gray-400">
              <div className="w-8 h-8 bg-gray-300 text-black rounded-full flex items-center justify-center text-sm font-semibold mr-2">2</div>
              <span className="font-medium">Review & Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <CheckoutForm
              customerForm={customerForm}
              cardForm={cardForm}
              handleCustomerChange={handleCustomerChange}
              handleCardChange={handleCardChange}
              errors={errors}
            />
          </div>

          {/* Order Summary - Takes 1 column */}
          <div className="lg:col-span-1">
            <OrderSummary
              product={productDetails}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-center space-x-6 text-gray-600 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Free Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}