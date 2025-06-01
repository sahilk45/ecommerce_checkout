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
    'Bubblegum Pink',
    35
  ),
  (
    'Converse Chuck Taylor All Star High',
    'Bright and bold yellow colorway that adds sunshine to any outfit. Premium canvas construction.',
    75.00,
    'Sunshine Yellow',
    28
  ),
  (
    'Converse Chuck 70 Low Top',
    'Vintage-inspired low-top with premium materials and enhanced cushioning for all-day comfort.',
    80.00,
    'Cream White',
    22
  ),
  (
    'Converse Chuck Taylor All Star High',
    'Deep purple high-top that combines classic style with modern flair. Perfect for creative expressions.',
    75.00,
    'Royal Purple',
    33
  ),
  (
    'Converse Chuck Taylor All Star Low',
    'Sleek grey low-top that pairs perfectly with any casual or semi-formal outfit.',
    70.00,
    'Charcoal Grey',
    40
  ),
  (
    'Converse Chuck 70 High Top',
    'Premium black leather version with vintage details and superior comfort technology.',
    95.00,
    'Premium Black Leather',
    15
  ),
  (
    'Converse Chuck Taylor All Star High',
    'Vibrant orange high-top that makes a bold fashion statement. Perfect for standing out.',
    75.00,
    'Electric Orange',
    18
  ),
  (
    'Converse Chuck Taylor All Star Low',
    'Soft mint green low-top with a fresh, modern look. Ideal for spring and summer styling.',
    70.00,
    'Mint Fresh',
    27
  ),
  (
    'Converse Chuck 70 High Top',
    'Sophisticated brown leather high-top with vintage appeal and modern comfort features.',
    90.00,
    'Vintage Brown Leather',
    12
  ),
  (
    'Converse Chuck Taylor All Star High',
    'Elegant burgundy high-top that adds a touch of sophistication to your casual wardrobe.',
    75.00,
    'Wine Burgundy',
    24
  );

-- Verify the insertion
SELECT COUNT(*) as total_products FROM products;
SELECT variant, inventory FROM products ORDER BY id;