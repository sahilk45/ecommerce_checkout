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
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSiSAyzgwiNy03EPyl2LaXjVrH7x9r3Fz11u_SkdNLnUmVn2QShmeCxAJvMjHHZCZrr8PZIccCFam1YKGEcomRIpWVdcdMeU-k5IMeiMxDcgNXUYxw3BCmu'
  ),
  (
    'EXOTIC Hand Bag',
    'The ultimate versatile sneaker in classic black. Goes with everything in your wardrobe.',
    75.00,
    'Midnight Black',
    52,
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSMXA-NCthZ4ckQ7N_yCJrsTgcobxkYeJvRupMVicuHgXl2jZJlObrSju4aWnONe-R65hFHwBAhkqiZrlEVVr66GKhXpjARKKWJ_H5UhX6ogvnqrkdqQ-SW'
  ),
  (
    'DENVER Hamilton Gift Set',
    'Low-top version of the classic Chuck Taylor. Same iconic style with a more casual silhouette.',
    70.00,
    'Pure White',
    30,
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQXX0etND8SJmcifrumpMXxS3GKL1DZFwpVFD1Q28n2mD6cMjyUZKeog7LF4pM42qmatQX3j-C-UyrXvRstN1zTA3TFpEQRKqvF9lVGnMCzj07qHLD7bPfE'
  ),
  (
    'Crocs Classic Men Unisex Clog',
    'Stand out from the crowd with this vibrant forest green colorway. Perfect for making a statement.',
    75.00,
    'Forest Green',
    25,
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTGnDmaYRCWhHj_fgCDMXYHIsgiUS7TVQ4DmHetq2a7H04dBOG3Ct3DWM-5CaRoTTyo6_S5aXMhj5kWCI6P33HssP6CWADoyrfK3asxxAHyoKVkyV2lyVuixg'
  ),
  (
    'Sonata Men Poze Analog Watch',
    'Premium version of the classic with enhanced comfort, durability, and vintage-inspired details.',
    85.00,
    'Vintage Navy',
    20,
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcROim40sHC4WvvlT7Y-RhLQ5JX-N7EL716yjbOT_7ddivfQ7K4R553HKxmSDjW04R7kt4_zXV_hqK44jOcaAOCAvIsTfus4sG5fBuWVgBE'
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
    'Rare Rabbit Men Solid Casual Shirt',
    'Vintage-inspired low-top with premium materials and enhanced cushioning for all-day comfort.',
    80.00,
    'Cream White',
    22,
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR4QXi_QGvv8BVB4q8Wgc0OkIMUPghZ8-5KMDNwtNo5dRBVDApwqn9jqubu-cjKuaGM2sqX9qh_-UqpqHWl7ggNbRZXBkHQcIXGVlOqxMbS-btfTUoI8Jok'
  );

-- Verify the insertion
SELECT COUNT(*) as total_products FROM products;
SELECT variant, inventory, image_url FROM products ORDER BY id;