const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true, default: 'adidas' },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, enum: ['featured', 'new', 'all'], default: 'all' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
