const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.Zs77BmIVXDHlNlFIpltKXQjvBPhf0wPC7UTs4HA9DPY';
const userData = {
  id: 1,
  email: 'test@test.com',
  name: 'Test',
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is alive!');
});

app.get('/me', (req, res) => {
  if (req.headers.authorization !== `Bearer ${ACCESS_TOKEN}`) {
    res.status(404).send('User not logged in')
  }
  res.send(userData);
});

app.post('/login', (req, res) => {
  if (req.body.email !== userData.email) {
    res.status(400).send('User does not exist');
    return;
  }
  res.send({
    ...userData,
    access_token: ACCESS_TOKEN,
  })
});

app.post('/create-user', (req, res) => {
  if (req.body.email === userData.email) {
    res.status(400).send('User already exists');
    return;
  }
  res.send({ success: true })
});

app.post('/register', (req, res) => {
  res.send({
    ...userData,
    access_token: ACCESS_TOKEN,
  })
});

app.listen(port, () => console.log(`Listening on port ${port}..`));
