const express = require('express');
const app = express();
const port = 3000;
const Controller = require('./Controller');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./client/dist'));


// app.get('/', (req, res) => {
//   res.send('Hello World')
// });



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
