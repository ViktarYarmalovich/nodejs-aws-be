INSERT INTO products (url_id, title, description, weight, img, creation_date, price) VALUES
('Carbide-Hand-Chisel', 'Carbide Hand Chisel', 'Use the Hand Chisel for general stone shaping and roughing out applications', 860, 'https://images-na.ssl-images-amazon.com/images/I/31343YFackL._AC_.jpg', '2020-04-11', 57),
('Masonry-Hammer-3-Lb', 'Masonry Hammer 3 Lb', 'These are stone masons’ tools. The sledge usually has a crowned, oval striking face with a napping face opposite. The spalling hammer has a beveled striking', 1500, 'https://images-na.ssl-images-amazon.com/images/I/61XfjqijN3L._AC_SL1500_.jpg', '2020-11-09', 98),
('Stone-Pitching-Chisel', 'Stone Pitching Chisel', 'All Pitching Chisels are made extra heavy duty for the toughest of requirements. They are made from high carbon tool steels, and have a super tough Tungsten Carbide tip. The chisel has ample support for the tip to give this tool a long life, where as some can fail due to lack of support behind the tip. Approximately 9" long, they have a flat hammer head for a large striking area.', 600, 'https://images-na.ssl-images-amazon.com/images/I/51IEHtQkp6L._AC_SL1200_.jpg', '2020-10-03', 46),
('Stone-Splitting-Wedge', 'Stone Splitting Wedge', 'Wedges and shims, or "plugs and feathers", as they are sometimes called, are used to free stone from its surface, or to reduce it in size. Wedges and shims are available in three part sets (each piece sold individually), comprised of a forged steel splitting wedge that will be used to expand a matching pair of forged steel shims.', 600, 'https://images-na.ssl-images-amazon.com/images/I/31LTHvvThJL._AC_.jpg', '2020-05-03', 15),
('4-Pound-Toothed-Bush-Hammer', '4-Pound Steel Toothed Bush Hammer', 'Perfect for shaping, texturizing, and smoothing soft stone, such as marble or limestone.', 1800, 'https://images-na.ssl-images-amazon.com/images/I/61PSkLLka-L._AC_SL1500_.jpg', '2020-10-11', 87),
('Round-Mallet-Bell-Hammer', 'Round Mallet / Bell Hammer', 'Our High Quality Round Hand Hammer is hardened for more power and better wear. The round striking surface makes it easier to deliver a solid blow every time. ', 600, 'https://images-na.ssl-images-amazon.com/images/I/51hdPZCJC3L._AC_SL1000_.jpg', '2020-01-09', 58);


INSERT INTO stocks (product_id, count) VALUES
((SELECT id from products WHERE url_id='Carbide-Hand-Chisel'), 27),
((SELECT id from products WHERE url_id='Masonry-Hammer-3-Lb'), 34),
((SELECT id from products WHERE url_id='Stone-Pitching-Chisel'), 67),
((SELECT id from products WHERE url_id='Stone-Splitting-Wedge'), 163),
((SELECT id from products WHERE url_id='4-Pound-Toothed-Bush-Hammer'), 38),
((SELECT id from products WHERE url_id='Round-Mallet-Bell-Hammer'), 64);