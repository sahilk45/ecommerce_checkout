-- db/seed.sql

-- Insert a demo product (e.g., Converse shoe)
INSERT INTO products (title, description, price, variant, inventory)
VALUES (
  'Converse Chuck Taylor All Star',
  'The iconic sneaker reimagined for modern comfort and everyday wear.',
  70.00,
  'Red',
  50
);

-- Add optional variants if needed
INSERT INTO products (title, description, price, variant, inventory)
VALUES 
  ('Converse Chuck Taylor All Star', 'Same iconic comfort in Blue.', 70.00, 'Blue', 30),
  ('Converse Chuck Taylor All Star', 'Classic Black for all outfits.', 70.00, 'Black', 40);
