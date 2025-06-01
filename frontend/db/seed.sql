-- Reduced seed data with image URLs
-- File location: frontend/db/seed.sql

-- Clear existing data
TRUNCATE TABLE products, orders RESTART IDENTITY CASCADE;

-- Insert reduced product variants with image URLs
INSERT INTO products (title, description, price, variant, inventory, image_url) VALUES 
  (
    'Converse Chuck Taylor All Star High',
    'The iconic high-top sneaker that started it all. Classic canvas upper with rubber toe cap and signature All Star logo.',
    75.00,
    'Classic Red',
    45,
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&auto=format'
  ),
  (
    'Nova NHP-8100 Foldable Hair Dryer',
    'Timeless style meets modern comfort. Perfect for any casual outfit or street style look.',
    75.00,
    'Ocean Blue',
    38,
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format'
  ),
  (
    'Converse Chuck Taylor All Star High',
    'The ultimate versatile sneaker in classic black. Goes with everything in your wardrobe.',
    75.00,
    'Midnight Black',
    52,
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&auto=format'
  ),
  (
    'Converse Chuck Taylor All Star Low',
    'Low-top version of the classic Chuck Taylor. Same iconic style with a more casual silhouette.',
    70.00,
    'Pure White',
    30,
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&auto=format&sat=-100'
  ),
  (
    'Converse Chuck Taylor All Star High',
    'Stand out from the crowd with this vibrant forest green colorway. Perfect for making a statement.',
    75.00,
    'Forest Green',
    25,
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format&hue=120'
  ),
  (
    'Converse Chuck 70 High Top',
    'Premium version of the classic with enhanced comfort, durability, and vintage-inspired details.',
    85.00,
    'Vintage Navy',
    20,
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&auto=format&hue=240'
  ),
  (
    'Converse Chuck Taylor All Star Low',
    'Classic low-top in a beautiful pink shade. Perfect for adding a pop of color to your outfit.',
    70.00,
    'Bubblegum Pink',
    35,
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&auto=format&hue=300'
  ),
  (
    'Converse Chuck 70 Low Top',
    'Vintage-inspired low-top with premium materials and enhanced cushioning for all-day comfort.',
    80.00,
    'Cream White',
    22,
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&auto=format&sepia=100'
  );

-- Verify the insertion
SELECT COUNT(*) as total_products FROM products;
SELECT variant, inventory, image_url FROM products ORDER BY id;