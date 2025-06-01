CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title TEXT,
  description TEXT,
  price NUMERIC,
  variant TEXT,
  inventory INTEGER
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number TEXT,
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  card_last4 TEXT,
  variant TEXT,
  quantity INTEGER,
  status TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
