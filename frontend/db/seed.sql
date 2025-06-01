-- Enhanced seed data with multiple products

-- Clear existing data
TRUNCATE TABLE products, orders RESTART IDENTITY CASCADE;

-- Insert multiple product variants
INSERT INTO products (title, description, price, variant, inventory) VALUES 
  (
    'Converse Chuck Taylor All Star High',
    'The iconic high-top sneaker that started it all. Classic canvas upper with rubber toe cap and signature All Star logo.',
    75.00,
    'Classic Red',
    45
  ),
  (
    'Converse Chuck Taylor All Star High',
    'Timeless style meets modern comfort. Perfect for any casual outfit or street style look.',
    75.00,
    'Ocean Blue',
    38
  ),
  (
    'Converse Chuck Taylor All Star High',
    'The ultimate versatile sneaker in classic black. Goes with everything in your wardrobe.',
    75.00,
    'Midnight Black',
    52
  ),
  (
    'Converse Chuck Taylor All Star Low',
    'Low-top version of the classic Chuck Taylor. Same iconic style with a more casual silhouette.',
    70.00,
    'Pure White',
    30
  ),
  (
    'Converse Chuck Taylor All Star High',
    'Stand out from the crowd with this vibrant forest green colorway. Perfect for making a statement.',
    75.00,
    'Forest Green',
    25
  ),
  (
    'Converse Chuck 70 High Top',
    'Premium version of the classic with enhanced comfort, durability, and vintage-inspired details.',
    85.00,
    'Vintage Navy',
    20
  ),
  (
    'Converse Chuck Taylor All Star Low',
    'Classic low-top in a beautiful pink shade. Perfect for adding a pop of color to your outfit.',
    70.00,
    '