const express = require("express");
const cors = require("cors");
const routerApi = require("./routes")
const {logErrors,errorHandler, boomErrorHandler} = require("./middleware/error.handler")


const app = express();
const port = 3000;
/* con heroku
const port = process.env.PORT || 3000;


*/
app.use( express.json() );

/* cors problem to access http://localhost or other domain*/
const whitelist = ["http://localhost:8080", "https://myapp.co", "https://web.postman.co/workspace/My-Workspace~0ee2e29f-1966-4044-833c-ce23696dbbee/request/20176949-4df553bc-4f64-4955-b291-439ea708d29c" ]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    }else
    callback(new Error("no permission "));

  }
}
app.use(cors(options));

app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get("/nueva-ruta", (req, res) =>{
  res.send("Hola soy nuevo server en Express");
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


/* app.get("/products", (req, res) =>{
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for (let index =0; index < limit; index++){
    products.push(
        {
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        }
      );
    }
    res.json(products);
}); */

/* Se esperaba una respuesta de tipo json y se crea el objeto */

  /* res.json( [
    {
    name: "Product 1",
    price: 1000,
    },
    {
    name: "Product 2",
    price: 2000,
    }

  ] );

});
*/
/* app.get('/categories', (req, res) => {

  res.json({
        category: 'Computers & Accesories'
    }, {
      category: 'celulares'
    }
  );
}); */

/* app.get('/people', (req, res) => {
  res.json([{
      name: 'Arturo',
      type: 'employee'
  }, {
      name: 'Jimena',
      type: 'customer'
  }]);
}); */

/* app.get('/users', (req, res) => {
  const {limit,offset} = req.query;
  if (limit && offset) {
    res.json({limit,
      offset

    });
  }else{
    res.send("no hay parametros ");
  }

}) */


/* app.get('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
      categoryId,
      category: 'Computers & Accesories'
  });
}); */

/* endpoints staticos o especificos van antes de los dinámicos */

/* app.get("/products/filter", (req, res) =>{
  res.send("soy un filtro");

} );

app.get("/products/:id", (req, res) =>{
  const { id } = req.params.id;
  res.json(  {
    id,
    name: "Product 2",
    price: 2000,
  } );

} ); */


/*
app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const {categoryId, productId} = req.params;
  res.json( { categoryId,
    productId,

  })

}); */

/* app.get('/people/:id', (req, res) => {
  const { id } = req.params;
  res.json({
      id,
      name: 'Arturo',
      type: 'employee'
  });
}); */

app.listen(port, () =>{
  console.log("My port: " + port);
});
