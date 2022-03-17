const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const Controller = require('./Controller');
const { TOKEN } = require('../config.js');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'karlithomas',
  host: 'localhost',
  database: 'pair',
  port: 5432,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./client/dist'));

// axios.interceptors.request.use(request => {
//   console.log('Starting Request', request);
//   return request;
// })

// axios.interceptors.response.use(response => {
//   console.log('Response:', response);
//   return response;
// })

app.get('/food/wine/dishes', (req, res) => {
  // console.log(req.params, req.query.wine)
  axios.get(`https://api.spoonacular.com/food/wine/dishes`, {
    params: { ...req.query, apiKey: TOKEN}
  })
  .then(spoonRes => res.status(spoonRes.status).json(spoonRes.data))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.get('/recipes/complexSearch', (req, res) => {
  axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
    params: {...req.query, apiKey: TOKEN}
  })
  .then(spoonRes => res.status(spoonRes.status).json(spoonRes.data))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})

app.get(`/recipes/:id/information`, (req, res) => {
  axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information`, {
    params: {apiKey: TOKEN}
  })
  .then(spoonRes => res.status(spoonRes.status).json(spoonRes.data))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
})

app.post('/saved', (req, res) => {
  const { id, title, imageUrl } = req.body;
  pool.query('INSERT INTO recipes (id, title, image_url) VALUES ($1, $2, $3);', [id, title, imageUrl])
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.get('/saved', (req, res) => {
  pool.query('SELECT id, title, image_url FROM recipes;')
  .then(dbRes => {
    console.log(dbRes.rows);
    res.json(dbRes.rows.map(row => ({
      id: parseInt(row.id),
      title: row.title,
      image: row.image_url,
    })));
  })
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.delete('/saved/:recipeId', (req, res) => {
  const { recipeId } = req.params;
  pool.query('DELETE FROM recipes WHERE id=$1', [recipeId])
  .then(() => res.sendStatus(200))
  .catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
