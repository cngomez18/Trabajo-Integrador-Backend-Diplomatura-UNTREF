const express = require('express')
const app = express()
const connectDB = require('./src/database')
const morgan = require('morgan')
const Product = require('./src/product')
const PORT = process.env.PORT ?? 3000

connectDB()

app.use(express.json())
app.use(morgan('dev'))

//------------------------------

app.get('/prenda', async (req, res) => {
    try {
        const productos = await Product.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});

app.get('/prenda/buscar', async (req, res) => {

    const { nombre } = req.query;
    const query = nombre ? { nombre: { $regex: nombre, $options: 'i' } } : {};
  
    try {
      const productos = await Product.find(query);

      if (productos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos' });
      }

      res.status(200).json(productos);

    } catch (error) {
      res.status(500).json({ message: 'Error al buscar productos', error });
    }
});


app.get('/prenda/:id', async (req, res) => {
    try {
      const producto = await Product.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});
  

app.post('/prenda', async (req, res) => {
    
});

app.patch('/prenda/:id', async (req, res) => {
    
});
  
  
app.delete('/prenda/:id', async (req, res) => {
});

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});
  

//------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

