const express = require('express');

const productsRouter = require('./products.router');
// const usersRouter = require('./users.router');

function routerApi(app) {
  const routes = express.Router();
  app.use('/api/v1', routes)
  routes.use('/products', productsRouter);
//  app.use('/users', productsRouter);
//  app.use('/categories', productsRouter);
}

module.exports = routerApi;
