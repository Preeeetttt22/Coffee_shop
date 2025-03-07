const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock database
const products = [
  { id: 1, name: 'Garden Of Eden', price: 69.69, description: 'High-Quality Coffee', image: 'https://tse3.mm.bing.net/th?id=OIP.TW6Jch5R3iSd_lq2ub87ogHaF7&w=379&h=379&c=7' },
  { id: 2, name: 'Rainforest Symphony', price: 79.79, description: 'Daily-Essential Coffee', image: 'https://tse1.mm.bing.net/th?id=OIP.6tMYXMx37DBYdfysoot7fAHaHa&w=474&h=474&c=7' },
  { id: 3, name: 'Sunset Serenade', price: 89.89, description: 'Fresh-fusion Coffee', image: 'https://tse4.mm.bing.net/th?id=OIP.qULSuF7TBUbEZOAqwAaDeAHaHa&w=474&h=474&c=7' },
  { id: 4, name: 'Magic Macchiato', price: 99.99, description: 'Miracle-Morning Coffee', image: 'https://tse3.mm.bing.net/th?id=OIP.SuNTjKQLo-2vQbu-ILJADgHaE8&w=316&h=316&c=7' },
  { id: 5, name: 'Espresso', price: 19.00, description: 'Regular Coffee', image: 'https://tse3.mm.bing.net/th?id=OIP.TW6Jch5R3iSd_lq2ub87ogHaF7&w=379&h=379&c=7' }
];

let orders = [];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: orders.length + 1,
    ...req.body,
    date: new Date(),
    status: 'pending'
  };
  orders.push(order);
  res.json(order);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});