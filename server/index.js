const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const Controller = require('./Controller');
const { TOKEN } = require('../config.js');

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


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
