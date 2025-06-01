export default function CheckoutForm({ customerForm, cardForm, handleCustomerChange, handleCardChange, errors }) {
  return (
    <div className="space-y-8">
      {/* Customer Details */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Shipping Information
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input 
                name="name" 
                placeholder="Enter your full name" 
                value={customerForm.name}
                onChange={handleCustomerChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input 
                name="email" 
                type="email"
                placeholder="your@email.com" 
                value={customerForm.email}
                onChange={handleCustomerChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input 
                name="phone" 
                placeholder="(555) 123-4567" 
                value={customerForm.phone}
                onChange={handleCustomerChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input 
                name="address" 
                placeholder="123 Main Street, Apt 4B" 
                value={customerForm.address}
                onChange={handleCustomerChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input 
                name="city" 
                placeholder="New York" 
                value={customerForm.city}
                onChange={handleCustomerChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input 
                name="state" 
                placeholder="NY" 
                value={customerForm.state}
                onChange={handleCustomerChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code *
              </label>
              <input 
                name="zip" 
                placeholder="10001" 
                value={customerForm.zip}
                onChange={handleCustomerChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.zip ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.zip && <p className="text-red-600 text-sm mt-1">{errors.zip}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Payment Information
          </h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number *
            </label>
            <input 
              name="number" 
              placeholder="1234 5678 9012 3456" 
              value={cardForm.number}
              onChange={handleCardChange} 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.number ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              maxLength="19"
            />
            {errors.number && <p className="text-red-600 text-sm mt-1">{errors.number}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input 
                name="expiry" 
                placeholder="MM/YY" 
                value={cardForm.expiry}
                onChange={handleCardChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.expiry ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                maxLength="5"
              />
              {errors.expiry && <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV *
              </label>
              <input 
                name="cvv" 
                placeholder="123" 
                value={cardForm.cvv}
                onChange={handleCardChange} 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                maxLength="3"
              />
              {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
          
          {/* Payment Simulation - Only for testing */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Test Mode - Simulate Transaction Result
              </span>
            </label>
            <select 
              name="simulationCode" 
              value={cardForm.simulationCode}
              onChange={handleCardChange} 
              className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white"
            >
              <option value="1">✅ Successful Payment</option>
              <option value="2">❌ Payment Declined</option>
              <option value="3">⚠️ Processing Error</option>
            </select>
            <p className="text-xs text-yellow-700 mt-1">
              This is for testing purposes only. In production, this would be handled by your payment processor.
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800">Secure Payment</p>
                <p className="text-xs text-green-700">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}