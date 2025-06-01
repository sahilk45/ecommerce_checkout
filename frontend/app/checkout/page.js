export default function CheckoutForm({ form, handleChange }) {
  return (
    <div className="glass-card p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} className="form-input" />
      <input name="email" placeholder="Email" onChange={handleChange} className="form-input" />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} className="form-input" />
      <input name="address" placeholder="Address" onChange={handleChange} className="form-input" />
      <input name="city" placeholder="City" onChange={handleChange} className="form-input" />
      <input name="state" placeholder="State" onChange={handleChange} className="form-input" />
      <input name="zip" placeholder="Zip Code" onChange={handleChange} className="form-input" />
      <h2 className="text-xl font-semibold mt-6 mb-4">Card Details</h2>
      <input name="number" placeholder="Card Number" maxLength="16" onChange={handleChange} className="form-input" />
      <input name="expiry" placeholder="Expiry Date (MM/YY)" onChange={handleChange} className="form-input" />
      <input name="cvv" placeholder="CVV" maxLength="3" onChange={handleChange} className="form-input" />
      <select name="simulationCode" onChange={handleChange} className="form-input">
        <option value="1">Simulate: Approved ✅</option>
        <option value="2">Simulate: Declined ❌</option>
        <option value="3">Simulate: Error ⚠️</option>
      </select>
    </div>
  );
}