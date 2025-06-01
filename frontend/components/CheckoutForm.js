export default function CheckoutForm({ customerForm, cardForm, handleCustomerChange, handleCardChange, errors }) {
  return (
    <div className="space-y-6">
      {/* Customer Details */}
      <div className="glass-card-enhanced p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
          👤 Customer Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input 
              name="name" 
              placeholder="Full Name *" 
              value={customerForm.name}
              onChange={handleCustomerChange} 
              className={`form-input-enhanced ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <input 
              name="email" 
              type="email"
              placeholder="Email Address *" 
              value={customerForm.email}
              onChange={handleCustomerChange} 
              className={`form-input-enhanced ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <input 
              name="phone" 
              placeholder="Phone Number *" 
              value={customerForm.phone}
              onChange={handleCustomerChange} 
              className={`form-input-enhanced ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <input 
              name="address" 
              placeholder="Street Address *" 
              value={customerForm.address}
              onChange={handleCustomerChange} 
              className={`form-input-enhanced ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
          </div>
          
          <div>
            <input 
              name="city" 
              placeholder="City *" 
              value={customerForm.city}
              onChange={handleCustomerChange} 
              className={`form-input-enhanced ${errors.city ? 'border-red-500' : ''}`}
            />
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <input 
              name="state" 
              placeholder="State *" 
              value={customerForm.state}
              onChange={handleCustomerChange} 
              className={`form-input-enhanced ${errors.state ? 'border-red-500' : ''}`}
            />
            {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
          </div>
          
          <div className="md:col-span-2">
            <input 
              name="zip" 
              placeholder="Zip Code *" 
              value={customerForm.zip}
              onChange={handleCustomerChange} 
              className={`form-input-enhanced ${errors.zip ? 'border-red-500' : ''}`}
            />
            {errors.zip && <p className="text-red-400 text-sm mt-1">{errors.zip}</p>}
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="glass-card-enhanced p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
          💳 Payment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <input 
              name="number" 
              placeholder="Card Number *" 
              value={cardForm.number}
              onChange={handleCardChange} 
              className={`form-input-enhanced ${errors.number ? 'border-red-500' : ''}`}
              maxLength="19"
            />
            {errors.number && <p className="text-red-400 text-sm mt-1">{errors.number}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input 
                name="expiry" 
                placeholder="MM/YY *" 
                value={cardForm.expiry}
                onChange={handleCardChange} 
                className={`form-input-enhanced ${errors.expiry ? 'border-red-500' : ''}`}
                maxLength="5"
              />
              {errors.expiry && <p className="text-red-400 text-sm mt-1">{errors.expiry}</p>}
            </div>
            
            <div>
              <input 
                name="cvv" 
                placeholder="CVV *" 
                value={cardForm.cvv}
                onChange={handleCardChange} 
                className={`form-input-enhanced ${errors.cvv ? 'border-red-500' : ''}`}
                maxLength="3"
              />
              {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Transaction Simulation</label>
            <select 
              name="simulationCode" 
              value={cardForm.simulationCode}
              onChange={handleCardChange} 
              className="form-input-enhanced"
            >
              <option value="1">✅ Simulate: Approved Transaction</option>
              <option value="2">❌ Simulate: Declined Transaction</option>
              <option value="3">⚠️ Simulate: Gateway Error</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}