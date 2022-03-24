const express = require('express');
/* const faker = require('faker'); */

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middleware/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schemas');

const router = express.Router();
const service = new ProductsService();


router.get('/', async (req, res) => {
  const products = await service.find();

  /* const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  } */
  res.json(products);
});

router.get('/filter', async (req, res) => {
   res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema,"params"),

  async (req, res, next) => {
    try {
      const { id } = req.params;
    const product =  await service.findone(id);
    res.json(product);
    } catch (error) {
      next(error);
    }


  /*
  if (id === "999" ){
    res.status(404).json(
      {
        message: 'not found'
      }
    )
  } else {
    res.status(200).json({
        id,
        name: 'Product 2',
        price: 2000
      });

    }; */



});

router.post("/",
validatorHandler(createProductSchema,"body"),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(/* {
     message: 'created',
     data: body
    } */
    newProduct
    );


});

router.patch('/:id',
validatorHandler(getProductSchema,"params"),
validatorHandler(updateProductSchema,"body"),
async (req, res, next) => {
    try {
      const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);

    res.json(/* {
      message: 'updated',
      data:body,
      id
    } */
    product
    )
    } catch (error) {
      next(error);

    }


});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta =  await service.delete(id);
  res.json(/* {
    message: 'deleted',

    id
  } */
  rta
  )

});

module.exports = router;
