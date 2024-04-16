// here you have a products array. by implementing express app write crud functions related to this array.
//- get functions
//- post
//- put
//- delete
let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];


  //Answer

  app.get('/products', (req, res) => {
    res.json(products);
  });
  
  app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
  
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
  app.get('/products/search', (req, res) => {
    const query = req.query.q;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
  
    let filteredProducts = products;
  
    if (query) {
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    }
  
    if (!isNaN(minPrice)) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }
  
    if (!isNaN(maxPrice)) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }
  
    res.json(filteredProducts);
  });
  
  app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || isNaN(price)) {
      res.status(400).json({ error: 'Invalid product data' });
      return;
    }
  
    const newProductId = products.length + 1;
    const newProduct = { id: newProductId, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });
  
  app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
  
    const productIndex = products.findIndex(p => p.id === productId);
  
    if (productIndex === -1) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
  
    if (name) {
      products[productIndex].name = name;
    }
  
    if (!isNaN(price)) {
      products[productIndex].price = price;
    }
  
    res.json(products[productIndex]);
  });
  
  app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
  
    if (productIndex === -1) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
  
    products.splice(productIndex, 1);
    res.status(204).end();
  });
  
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });