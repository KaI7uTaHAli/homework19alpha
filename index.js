const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Главная' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'О нас' });
});

app.get('/quote', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    res.render('quote', { title: 'Случайная цитата', quote });
  } catch (error) {
    res.render('quote', { title: 'Ошибка', quote: { content: 'Ошибка загрузки', author: '' } });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер работает: http://localhost:${PORT}`);
});
