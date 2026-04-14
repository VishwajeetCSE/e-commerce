const db = require('./database');

const products = [
  { name: "Cartoon Astronaut T-Shirts", brand: "addidas", price: 78, image: "img/products/f1.jpg", category: "featured" },
  { name: "Cartoon Leaf Pattern T-Shirts", brand: "addidas", price: 78, image: "img/products/f2.jpg", category: "featured" },
  { name: "Floral Print Summer Shirt", brand: "addidas", price: 78, image: "img/products/f3.jpg", category: "featured" },
  { name: "Pink Flower Blossom Shirt", brand: "addidas", price: 78, image: "img/products/f4.jpg", category: "featured" },
  { name: "Blue Violet Pattern Shirt", brand: "addidas", price: 78, image: "img/products/f5.jpg", category: "featured" },
  { name: "Two-Tone Jacket Combo", brand: "addidas", price: 78, image: "img/products/f6.jpg", category: "featured" },
  { name: "Classic Print Pants", brand: "addidas", price: 78, image: "img/products/f7.jpg", category: "featured" },
  { name: "Abstract Pattern Shirt", brand: "addidas", price: 78, image: "img/products/f8.jpg", category: "featured" },
  { name: "Sky Blue Premium T-Shirt", brand: "addidas", price: 78, image: "img/products/n1.jpg", category: "new" },
  { name: "Grey Grid Checked Shirt", brand: "addidas", price: 78, image: "img/products/n2.jpg", category: "new" },
  { name: "White Polo Premium", brand: "addidas", price: 78, image: "img/products/n3.jpg", category: "new" },
  { name: "Green Safari Shirt", brand: "addidas", price: 78, image: "img/products/n4.jpg", category: "new" },
  { name: "Denim Blue Longsleeve", brand: "addidas", price: 78, image: "img/products/n5.jpg", category: "new" },
  { name: "Dark Cargo Shorts", brand: "addidas", price: 78, image: "img/products/n6.jpg", category: "new" },
  { name: "Khaki Executive Shirt", brand: "addidas", price: 78, image: "img/products/n7.jpg", category: "new" },
  { name: "Black Casual Polo", brand: "addidas", price: 78, image: "img/products/n8.jpg", category: "new" }
];

db.serialize(() => {
  // Clear any existing products
  db.run("DELETE FROM Products");
  
  // Re-seed DB
  const stmt = db.prepare("INSERT INTO Products (name, brand, price, image, category) VALUES (?, ?, ?, ?, ?)");
  
  products.forEach((product) => {
    stmt.run(product.name, product.brand, product.price, product.image, product.category);
  });
  
  stmt.finalize(() => {
    console.log("Database seeded successfully with 16 default products.");
    // Close the connection
    db.close((err) => {
      if (err) return console.error(err.message);
      console.log('Closed the database connection.');
    });
  });
});
