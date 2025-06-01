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
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💳 Secure Checkout</h1>
          <p className="text-blue-200">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <CheckoutForm 
              customerForm={customerForm}
              cardForm={cardForm}
              handleCustomerChange={handleCustomerChange}
              handleCardChange={handleCardChange}
              errors={errors}
            />
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <OrderSummary 
              product={productDetails}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}