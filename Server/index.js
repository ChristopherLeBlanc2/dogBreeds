const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3000;

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'dog-data',
  user: 'christopherleblanc',
  password: 'Reg@n1995',
});
(async () => {
  await client.connect();
})();

app.get('/api/breeds/list/all', async (req, res) => {
  const breeds = await client.query('SELECT * FROM breeds');
  const subBreeds = await client.query('SELECT * FROM sub_breeds');
  console.log(subBreeds.rows); // Hello world!
  res.send('Hello World!');
  /*
  Query the database for all breeds and subbreeds and respond with the following model
  {
    "message": {
        "appenzeller": [],
        "australian": [
            "shepherd"
        ]
      },
    "status": "success"
}
  */
});

app.get('/api/breed/:breedName/:subBreedName/images', (req, res) => {
  res.send('pictures');
  /*
  Query the database with the values of breedName and subBreedName and respond with
{
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
      ],
    "status": "success"
}
  */
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
