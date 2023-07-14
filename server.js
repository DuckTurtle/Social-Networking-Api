const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/networkapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// logs mongo querys
mongoose.set('debug', true);

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
