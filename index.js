const express = require('express');
const cors = require('cors');

const app = express();
const { Client } = require('pg');
const redis = require('redis');

const pgClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});
const redisClient = redis.createClient({ host: 'devops_tp_redis' });

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

const run = async () => {
  try {
    await pgClient.connect();
    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server started. PORT : ${port}`));
  } catch (e) {
    console.log(e);
    console.error('Unable to connect to the postgreSQL database');
  }
};

run();
