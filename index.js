const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('This is the About page');
});

app.get('/test', (req, res) => {
  res.send('This is the test page');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// npm run dev to get the localhost started